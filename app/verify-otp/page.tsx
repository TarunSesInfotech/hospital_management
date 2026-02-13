"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("verifyMobile") || "";
    }
    return "";
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const savedMobile = localStorage.getItem("verifyMobile");

    if (!savedMobile) {
      router.push("/register");
    }
  }, [router]);

  const handleVerify = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem("verifyMobile");

      // ✅ Agar patient page mobile se data fetch karta hai
      localStorage.setItem("patientMobile", mobile);

      router.push("/patient-details");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded-xl w-80 space-y-3 text-center">
        <h2 className="text-xl font-bold">Enter OTP</h2>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
