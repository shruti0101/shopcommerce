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
      post.metaDescription || post.excerpt || post.content.slice(0, 150),
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
    <div className="min-h-screen bg-[#F6F7FB] py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
        {cleanPost.image ? (
          <img
            src={cleanPost.image}
            alt={cleanPost.title}
            className="w-full max-h-[520px] object-cover"
          />
        ) : null}

        <div className="p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
            {new Date(cleanPost.createdAt).toLocaleDateString()} •{" "}
            {cleanPost.author}
          </p>
          <h1 className="text-4xl font-bold text-[#071B31] mb-4">
            {cleanPost.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{cleanPost.excerpt}</p>

          <div className="space-y-6 text-gray-700 leading-8">
            {cleanPost.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {cleanPost.tags?.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2">
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
    </div>
  );
}
