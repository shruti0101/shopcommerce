import axios from "axios";

import {
  getTxnDate,
  generatePlainHashText,
  generateSecureHash,
} from "@/lib/icici";

const ICICI_URL ="https://pgpayuat.icicibank.com/tsp/pg/api/v2/initiateSale"

export async function POST(req) {
  try {
    const {
      name,
      mobile,
      email,
      amount,
      orderId,
    } = await req.json();

    const merchantTxnNo =
      "TXN" + Date.now();

    const payload = {
      merchantId:
        process.env.MERCHANT_ID,

      aggregatorID:
        process.env.AGGREGATOR_ID,

      merchantTxnNo,

      amount: Number(amount).toFixed(2),

      currencyCode: "356",

      payType: "0",

      customerEmailID: email,

      customerMobileNo: mobile,

      customerName: name,

      transactionType: "SALE",

      txnDate: getTxnDate(),

      returnURL:
        process.env.RETURN_URL,

      addlParam1: orderId,

      addlParam2: "ECOM",
    };

    console.log("payment payload",payload)


    
    const plainText =
      generatePlainHashText(payload);

    payload.secureHash =
      generateSecureHash(plainText);

    const response = await axios.post(
      ICICI_URL,
      payload,
      {
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

const data = response.data;

console.log("========== ICICI REQUEST ==========");
console.log(payload);

console.log("========== HASH STRING ==========");
console.log(plainText);

console.log("========== SECURE HASH ==========");
console.log(payload.secureHash);

console.log("========== ICICI RESPONSE ==========");
console.log(JSON.stringify(data, null, 2));

    if (data.responseCode === "R1000") {
      return Response.json({
        success: true,
        paymentUrl:
          `${data.redirectURI}?tranCtx=${data.tranCtx}`,
      });
    }

    return Response.json(
      {
        success: false,
        iciciResponse: data,
      },
      { status: 400 }
    );




} catch (err) {
  console.log("========== ICICI ERROR ==========");

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Data:", JSON.stringify(err.response.data, null, 2));
  } else {
    console.log(err.message);
  }

  return Response.json(
    {
      success: false,
      message: "Payment initiation failed",
    },
    { status: 500 }
  );
}


}

