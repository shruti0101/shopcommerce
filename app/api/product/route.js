// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";
// import Category from "@/models/Category";
// import slugify from "slugify";
// //  CREATE
// export async function POST(req) {
//   await connectDB();
//   const data = await req.json();

//    console.log("DATA RECEIVED:", data); 

// const product = await Product.create({
//   ...data,

//   slug: slugify(data.name, {
//     lower: true,
//     strict: true,
//     trim: true,
//   }),

//   price: Number(data.price),

//   oldPrice: data.oldPrice
//     ? Number(data.oldPrice)
//     : 0,
// });

//   return Response.json(product);
// }

// //  READ
// export async function GET(req) {
//   await connectDB();

//   const { searchParams } = new URL(req.url);
//   const slug = searchParams.get("category");
//   const sort = searchParams.get("sort");

//   let filter = {};
//   let sortOption = {};

//   if (slug) {
//     const category = await Category.findOne({ slug });
//     if (!category) return Response.json([]);
//     filter.category = category._id;
//   }

//   if (sort === "price_low_to_high") sortOption.price = 1;
//   if (sort === "price_high_to_low") sortOption.price = -1;

//   const products = await Product.find(filter)
//     .sort(sortOption)
//     .populate("category");

//   return Response.json(products);
// }

// // ✅ UPDATE
// export async function PUT(req) {
//   await connectDB();

//   const data = await req.json();

// const updated = await Product.findByIdAndUpdate(
//   data._id,
//   {
//     ...data,

//     slug: slugify(data.name, {
//       lower: true,
//       strict: true,
//       trim: true,
//     }),

//     price: Number(data.price),

//     oldPrice: data.oldPrice
//       ? Number(data.oldPrice)
//       : 0,
//   },
//   { new: true }
// );

//   return Response.json(updated);
// }

// // ✅ DELETE
// export async function DELETE(req) {
//   await connectDB();

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   await Product.findByIdAndDelete(id);

//   return Response.json({ success: true });
// }















import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import slugify from "slugify";

export const dynamic = "force-dynamic";

// ✅ CREATE
export async function POST(req) {

  try {

    await connectDB();

    const data = await req.json();

    const product = await Product.create({

      ...data,

      slug: slugify(data.name, {
        lower: true,
        strict: true,
        trim: true,
      }),

      price: Number(data.price),

      oldPrice: data.oldPrice
        ? Number(data.oldPrice)
        : 0,

    });

    return Response.json(
      JSON.parse(JSON.stringify(product))
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}

// ✅ READ
export async function GET(req) {

  try {

    await connectDB();

    const { searchParams } = new URL(req.url);

    const slug =
      searchParams.get("category");

    const sort =
      searchParams.get("sort");

    let filter = {};
    let sortOption = {};

    // CATEGORY FILTER
    if (slug) {

      const category =
        await Category.findOne({
          slug,
        });

      if (!category) {

        return Response.json([]);

      }

      filter.category = category._id;

    }

    // SORT
    if (sort === "price_low_to_high") {

      sortOption.price = 1;

    }

    if (sort === "price_high_to_low") {

      sortOption.price = -1;

    }

    // PRODUCTS
    const products = await Product.find(filter)
      .populate("category")
      .sort(sortOption);

    return Response.json(
      JSON.parse(JSON.stringify(products))
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}

// ✅ UPDATE
export async function PUT(req) {

  try {

    await connectDB();

    const data = await req.json();

    const updated =
      await Product.findByIdAndUpdate(
        data._id,
        {

          ...data,

          slug: slugify(data.name, {
            lower: true,
            strict: true,
            trim: true,
          }),

          price: Number(data.price),

          oldPrice: data.oldPrice
            ? Number(data.oldPrice)
            : 0,

        },
        {
          new: true,
        }
      );

    return Response.json(
      JSON.parse(JSON.stringify(updated))
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}

// ✅ DELETE
export async function DELETE(req) {

  try {

    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const id =
      searchParams.get("id");

    await Product.findByIdAndDelete(id);

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}