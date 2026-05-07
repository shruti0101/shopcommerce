import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function POST(req) {
  try {
    const { imageUrl } = await req.json();

    const fileName = imageUrl.split("/").pop();

    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.CLOUD_FLARE_R2_BUCKET,
        Key: fileName,
      })
    );

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}