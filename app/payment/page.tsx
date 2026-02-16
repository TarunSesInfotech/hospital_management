/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  // 🔥 Example UPI Payment Link (₹5)
  const upiLink =
    "upi://pay?pa=yourupiid@upi&pn=CityCareHospital&am=5&cu=INR";

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-96">

        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          ₹5 Registration Fee
        </h2>

        <p className="text-gray-600 mb-4">
          Scan the QR code below to complete payment
        </p>

        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              upiLink
            )}`}
            alt="QR Code"
          />
        </div>

        <button
          onClick={() => router.push("/slip")}
          className="w-full bg-green-600 text-white p-3 rounded-lg"
        >
          Payment Done
        </button>
      </div>
    </div>
  );
}
