import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import Order from "@/models/Order";

import {
  generatePlainHashText,
  generateSecureHash,
} from "@/lib/icici";

export async function POST(req) {
  try {
    await connectDB();

    const formData =
      await req.formData();

    const responseData = {};

    formData.forEach((value, key) => {
      responseData[key] = value;
    });

    const receivedHash =
      responseData.secureHash;

    delete responseData.secureHash;

    const plainText =
      generatePlainHashText(
        responseData
      );

    const calculatedHash =
      generateSecureHash(plainText);

    const orderId =
      responseData.addlParam1;

    if (
      receivedHash !== calculatedHash
    ) {
      await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: "failed",
        }
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
      );
    }

    if (
      responseData.responseCode ===
      "0000"
    ) {
      await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: "paid",

          merchantTxnNo:
            responseData.merchantTxnNo,

          transactionId:
            responseData.pgTxnNo,
        }
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?txn=${responseData.merchantTxnNo}&amount=${responseData.amount}`
      );
    }

    await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "failed",
      }
      
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
    );
  } catch (err) {
    console.error(err);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
    );
  }
}