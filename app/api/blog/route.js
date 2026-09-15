
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
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    // Get single blog by slug
    if (slug) {
      const blog = await Blog.findOne({ slug });

      return NextResponse.json(
        blog ? JSON.parse(JSON.stringify(blog)) : null
      );
    }

    // Get single blog by ID
    if (id) {
      const blog = await Blog.findById(id);

      return NextResponse.json(
        blog ? JSON.parse(JSON.stringify(blog)) : null
      );
    }

    // Get all blogs
    // Sort by custom blog date first
    const blogs = await Blog.find().sort({
      date: -1,
      createdAt: -1,
    });

    return NextResponse.json(
      JSON.parse(JSON.stringify(blogs))
    );
  } catch (error) {
    console.error("GET BLOG ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    if (!data.title) {
      return NextResponse.json(
        { error: "Blog title is required" },
        { status: 400 }
      );
    }

    const slug = await createUniqueSlug(data.title);

    /*
      Convert selected date into a MongoDB Date.

      If no date is provided, use today's date.
    */
    const blogDate = data.date
      ? new Date(data.date)
      : new Date();

    if (Number.isNaN(blogDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid blog date" },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      ...data,

      slug,

      // Save selected blog date
      date: blogDate,

      tags:
        data.tags
          ?.map((tag) => tag.trim())
          .filter(Boolean) || [],
    });

    return NextResponse.json(
      JSON.parse(JSON.stringify(blog)),
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const data = await req.json();

    if (!data._id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    if (!data.title) {
      return NextResponse.json(
        { error: "Blog title is required" },
        { status: 400 }
      );
    }

    const slug = await createUniqueSlug(
      data.title,
      data._id
    );

    /*
      Convert selected date into a MongoDB Date.

      If the edit form doesn't send a date,
      keep the existing date.
    */
    let blogDate;

    if (data.date) {
      blogDate = new Date(data.date);

      if (Number.isNaN(blogDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid blog date" },
          { status: 400 }
        );
      }
    }

    const updateData = {
      ...data,
      slug,

      tags:
        data.tags
          ?.map((tag) => tag.trim())
          .filter(Boolean) || [],
    };

    // Only update date if a date was supplied
    if (blogDate) {
      updateData.date = blogDate;
    } else {
      delete updateData.date;
    }

    // Never save _id as part of the update object
    delete updateData._id;

    const updated = await Blog.findByIdAndUpdate(
      data._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      JSON.parse(JSON.stringify(updated))
    );
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing blog id" },
        { status: 400 }
      );
    }

    // 1. Find the blog first
    const post = await Blog.findById(id);

    if (!post) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // 2. Delete image from R2 if it exists
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
        // Don't stop blog deletion if image deletion fails
        console.error(
          `Failed to delete image from R2: ${err}`
        );
      }
    }

    // 3. Delete blog post
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("DELETE BLOG ERROR:", err);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

// Helper: extract R2 object key from full image URL
function extractKeyFromUrl(url) {
  try {
    const publicUrl =
      process.env.CLOUD_FLARE_R2_PUBLIC_URL;

    if (!publicUrl) return null;

    // If URL starts with public base, strip it
    if (url.startsWith(publicUrl)) {
      return url.replace(`${publicUrl}/`, "");
    }

    // Fallback: parse URL pathname
    const parsed = new URL(url);

    return parsed.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
}

