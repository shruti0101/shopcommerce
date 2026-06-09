import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
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
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Blog.findByIdAndDelete(id);
  return Response.json({ success: true });
}
