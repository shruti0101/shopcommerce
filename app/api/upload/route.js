import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadedUrls = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // ✅ Convert to webp
      const optimizedImage = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

      const fileName = `${uuid()}.webp`;

      // ✅ Upload to R2
      await r2.send(
        new PutObjectCommand({
          Bucket: process.env.CLOUD_FLARE_R2_BUCKET,
          Key: fileName,
          Body: optimizedImage,
          ContentType: "image/webp",
        })
      );

      const imageUrl = `${process.env.CLOUD_FLARE_R2_PUBLIC_URL}/${fileName}`;

      uploadedUrls.push(imageUrl);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}