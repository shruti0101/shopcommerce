export default async function PaymentSuccess({ searchParams }) {
  const params = await searchParams;

  const txn = params?.txn;
  const amount = params?.amount;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white rounded-xl shadow-xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Your payment has been completed successfully.
        </p>

        <div className="mt-6 text-left space-y-2">
          <p>
            <strong>Transaction:</strong> {txn}
          </p>

          <p>
            <strong>Amount:</strong> ₹{amount}
          </p>
        </div>

        <a
          href="/"
          className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}