/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/doctor-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("doctorData", JSON.stringify(data.doctor));
      router.push("/doctor-dashboard");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded-xl w-full max-w-md space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Doctor Login</h2>

        <input
          name="mobile"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-green-600 text-black p-2 rounded">
          Login
        </button>

        <p className="text-center text-sm">
          New doctor?{" "}
          <a href="/doctor-register" className="text-green-600 underline">
            Register
          </a>
        </p>

        <p className="text-center text-sm">
          <a href="/" className="text-blue-600 underline">
            Patient Login
          </a>
        </p>
      </form>
    </div>
  );
}
