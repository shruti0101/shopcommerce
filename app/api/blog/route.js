import { connectDB } from "@/lib/db";
import { r2 } from "@/lib/r2";
import Blog from "@/models/Blog";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const dynamic = "force-dynamic";

const createUniqueSlug = async (title, existingId = null) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let uniqueSlug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await Blog.findOne({
      slug: uniqueSlug,
      ...(existingId ? { _id: { $ne: existingId } } : {}),
    });

    if (!existing) {
      break;
    }

    uniqueSlug = `${baseSlug}-${count}`;
    count += 1;
  }

  return uniqueSlug;
};

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");

  if (slug) {
    const blog = await Blog.findOne({ slug });
    return Response.json(blog ? JSON.parse(JSON.stringify(blog)) : null);
  }

  if (id) {
    const blog = await Blog.findById(id);
    return Response.json(blog ? JSON.parse(JSON.stringify(blog)) : null);
  }

  const blogs = await Blog.find().sort({ createdAt: -1 });
  return Response.json(JSON.parse(JSON.stringify(blogs)));
}

export async function POST(req) {
  await connectDB();

  const data = await req.json();
  const slug = await createUniqueSlug(data.title);

  const blog = await Blog.create({
    ...data,
    slug,
    tags: data.tags?.map((tag) => tag.trim()).filter(Boolean) || [],
  });

  return Response.json(JSON.parse(JSON.stringify(blog)));
}

export async function PUT(req) {
  await connectDB();

  const data = await req.json();
  const slug = await createUniqueSlug(data.title, data._id);

  const updated = await Blog.findByIdAndUpdate(
    data._id,
    {
      ...data,
      slug,
      tags: data.tags?.map((tag) => tag.trim()).filter(Boolean) || [],
    },
    { new: true },
  );

  return Response.json(JSON.parse(JSON.stringify(updated)));
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing blog id" }, { status: 400 });
    }

    // 1. Find the blog first (so we can access the image)
    const post = await Blog.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // 2. Try to delete the image from R2 (if it exists)
    if (post.image) {
      try {
        const key = extractKeyFromUrl(post.image);

        if (key) {
          await r2.send(
            new DeleteObjectCommand({
              Bucket: process.env.CLOUD_FLARE_R2_BUCKET,
              Key: key,
            })
          );
          console.log(`Deleted image from R2: ${key}`);
        }
      } catch (err) {
        // Don't stop the blog deletion if image delete fails
        console.error(`Failed to delete image from R2: ${err}`);
      }
    }

    // 3. Delete the blog post
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

// Helper: extract the R2 object key from the full image URL
function extractKeyFromUrl(url) {
  try {
    const publicUrl = process.env.CLOUD_FLARE_R2_PUBLIC_URL;
    if (!publicUrl) return null;

    // If URL starts with the public base, strip it
    if (url.startsWith(publicUrl)) {
      return url.replace(`${publicUrl}/`, "");
    }

    // Fallback: try parsing the URL pathname
    const parsed = new URL(url);
    return parsed.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
}
