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