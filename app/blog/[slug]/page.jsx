import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  await connectDB();

  const { slug } = await params;

  const post = await Blog.findOne({ slug });

  if (!post) {
    return {
      title: "Blog post not found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description:
      post.metaDescription ||
      post.excerpt ||
      post.content?.slice(0, 150) ||
      "",
  };
}

export default async function BlogPostPage({ params }) {
  await connectDB();

  const { slug } = await params;

  const post = await Blog.findOne({ slug });

  if (!post) {
    notFound();
  }

  const cleanPost = JSON.parse(JSON.stringify(post));

  return (
    <main className="min-h-screen bg-[#F6F7FB] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-sm">

        {/* BLOG IMAGE */}
        {cleanPost.image ? (
          <div className="overflow-hidden">
            <img
              src={cleanPost.image}
              alt={cleanPost.title}
              className="max-h-[520px] w-full object-cover"
            />
          </div>
        ) : null}

        {/* BLOG CONTENT WRAPPER */}
        <div className="p-6 md:p-8 lg:p-10">

          {/* DATE + AUTHOR */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.15em] text-gray-500">
            <span>
              {cleanPost.createdAt
                ? new Date(cleanPost.date).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : ""}
            </span>

            {cleanPost.author ? (
              <>
                <span>•</span>
                <span>{cleanPost.author}</span>
              </>
            ) : null}
          </div>

          {/* BLOG TITLE */}
          <h1 className="mb-5 text-3xl font-bold leading-tight text-[#071B31] sm:text-4xl md:text-5xl">
            {cleanPost.title}
          </h1>

          {/* EXCERPT */}
          {cleanPost.excerpt ? (
            <p className="mb-8 text-lg leading-8 text-gray-600 md:text-xl">
              {cleanPost.excerpt}
            </p>
          ) : null}

          {/* JODIT CONTENT */}
          <article
            className="jodit-content"
            dangerouslySetInnerHTML={{
              __html: cleanPost.content || "",
            }}
          />

          {/* TAGS */}
          {cleanPost.tags?.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
              {cleanPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F3EFEA] px-3 py-1 text-sm text-[#071B31]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}