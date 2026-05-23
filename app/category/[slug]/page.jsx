import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

import CategoryClient from "./CategoryClient";

export async function generateMetadata({
  params,
}) {

  const { slug } = await params;

  await connectDB();

  const category =
    await Category.findOne({
      slug,
    });

  if (!category) {

    return {

      title: "Category Not Found",

      description:
        "This category does not exist.",

    };

  }

  return {

    title:
      category.metaTitle ||
      category.name,

    description:
      category.metaDescription ||
      `Shop ${category.name}`,

    openGraph: {

      title:
        category.metaTitle ||
        category.name,

      description:
        category.metaDescription ||
        `Shop ${category.name}`,

      images: [category.image],

    },

  };
}

export default async function Page({
  params,
}) {

  const { slug } = await params;

  return (
    <CategoryClient
      slug={slug}
    />
  );
}