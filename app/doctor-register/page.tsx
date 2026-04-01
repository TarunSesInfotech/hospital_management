/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    password: "",
    specialization: "",
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

    const res = await fetch("/api/doctor-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/doctor-login");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded-xl w-full max-w-md space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Doctor Registration</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="mobile"
          placeholder="Phone Number (10 digits)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 4 characters)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="specialization"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Specialization --</option>
          <option value="Cardiology">Cardiology (Heart)</option>
          <option value="Orthopedics">Orthopedics (Bone)</option>
          <option value="Neurology">Neurology (Brain)</option>
          <option value="Pediatrics">Pediatrics (Children)</option>
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>

        <p className="text-center text-sm">
          Already registered?{" "}
          <a href="/doctor-login" className="text-green-600 underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
