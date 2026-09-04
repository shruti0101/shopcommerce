import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";

export default async function BlogPage() {
  await connectDB();

  const posts = await Blog.find({ published: true }).sort({ createdAt: -1 });
  const cleanPosts = JSON.parse(JSON.stringify(posts));

  return (
    <div className="min-h-screen bg-[#F6F7FB] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#071B31] mb-3">Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read the latest updates, guides, and product news.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cleanPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center text-gray-500">
              No blog posts published yet.
            </div>
          ) : (
            cleanPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-60 w-full object-cover"
                  />
                ) : (
                  <div className="h-60 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}

                <div className="p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <h2 className="text-2xl font-semibold text-[#071B31] mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {post.excerpt || post.content.slice(0, 180) + "..."}
                  </p>
                  <div className="mt-5 text-slate-900 font-medium">
                    Read more →
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
