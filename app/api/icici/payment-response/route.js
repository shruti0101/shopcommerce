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

    const formData = await req.formData();

    const responseData = {};

    formData.forEach((value, key) => {
      responseData[key] = value;
    });

    console.log("=======================================");
    console.log("ICICI PAYMENT CALLBACK");
    console.log("=======================================");
    console.log(responseData);

    const receivedHash = responseData.secureHash;

    delete responseData.secureHash;

    const plainText = generatePlainHashText(responseData);

    const calculatedHash = generateSecureHash(plainText);

    console.log("Received Hash :", receivedHash);
    console.log("Calculated Hash :", calculatedHash);
    console.log(
      "Hash Match :",
      receivedHash === calculatedHash
    );

    console.log(
      "Response Code :",
      responseData.responseCode
    );

    console.log(
      "Description :",
      responseData.respDescription
    );

    console.log(
      "Order ID :",
      responseData.addlParam1
    );

    const orderId = responseData.addlParam1;

    if (!orderId) {
      console.log("Order ID Missing");

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      console.log("Order Not Found");

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
      );
    }

    // Hash Verification

    if (receivedHash !== calculatedHash) {
      console.log("HASH FAILED");

      order.paymentStatus = "failed";

      await order.save();

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
      );
    }

  // on pay success

  if (
    responseData.responseCode === "0000" ||
    responseData.responseCode === "R1000"
) {
      console.log("PAYMENT SUCCESS");

      order.paymentStatus = "paid";

      order.merchantTxnNo =
        responseData.merchantTxnNo || "";

      order.transactionId =
        responseData.txnID ||
        responseData.paymentID ||
        "";

      await order.save();

      console.log("ORDER UPDATED");

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?txn=${responseData.merchantTxnNo}&amount=${responseData.amount}`
      );
    }

// on pay failure

    console.log("PAYMENT FAILED");

    order.paymentStatus = "failed";

    await order.save();

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
    );
  } catch (err) {
    console.log("CALLBACK ERROR");
    console.log(err);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/payment-failed`
    );
  }
}

export async function GET() {
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SITE_URL}`
  );
}