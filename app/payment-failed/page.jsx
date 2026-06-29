export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white rounded-xl shadow-xl p-10 text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>

        <h1 className="text-3xl font-bold text-red-600">
          Payment Failed
        </h1>

        <p className="mt-4 text-gray-600">
          Your payment could not be completed.
        </p>

        <a
          href="/checkout"
          className="mt-8 inline-block bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}