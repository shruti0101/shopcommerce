import crypto from "crypto";

export function getTxnDate() {
  const d = new Date();

  const pad = (n) =>
    String(n).padStart(2, "0");

  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

export function generatePlainHashText(data) {
  return Object.keys(data)
    .sort()
    .map((k) =>
      data[k] !== null &&
      data[k] !== undefined
        ? data[k]
        : ""
    )
    .join("");
}

export function generateSecureHash(plainText) {
  return crypto
    .createHmac(
      "sha256",
      process.env.SECRET_KEY
    )
    .update(plainText)
    .digest("hex");
}





























// import crypto from "crypto";

// export function getTxnDate() {
//   const d = new Date();

//   const pad = (n) => String(n).padStart(2, "0");

//   return (
//     d.getFullYear() +
//     pad(d.getMonth() + 1) +
//     pad(d.getDate()) +
//     pad(d.getHours()) +
//     pad(d.getMinutes()) +
//     pad(d.getSeconds())
//   );
// }


// const HASH_FIELDS = [
//   "addlParam1",
//   "addlParam2",
//   "aggregatorID",
//   "amount",
//   "currencyCode",
//   "customerEmailID",
//   "customerMobileNo",
//   "customerName",
//   "merchantId",
//   "merchantTxnNo",
//   "payType",
//   "returnURL",
//   "transactionType",
//   "txnDate",
// ];

// export function generatePlainHashText(data) {
//   return HASH_FIELDS.map((field) => {
//     const value = data[field];
//     return value === null || value === undefined ? "" : String(value);
//   }).join("");
// }




// export function generateSecureHash(plainText) {
//   return crypto
//     .createHmac("sha256", process.env.SECRET_KEY)
//     .update(plainText, "utf8")
//     .digest("hex")
//     .toLowerCase();
// }



