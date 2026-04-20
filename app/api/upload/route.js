import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const { image } = await req.json();

  const result = await cloudinary.uploader.upload(image, {
    folder: "products",

    // 🔥 COMPRESSION + OPTIMIZATION
    transformation: [
      {
       quality: "auto:best", // highest quality auto,       // auto compress
        fetch_format: "auto",  // webp/avif automatically
   width: 1600,
height: 1600,
        crop: "limit",         // keep aspect ratio
      },
    ],
  });

  return Response.json({ url: result.secure_url });
}