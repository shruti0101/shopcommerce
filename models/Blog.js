import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    tags: [String],
    author: {
      type: String,
      default: "Admin",
    },
    published: {
      type: Boolean,
      default: true,
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
