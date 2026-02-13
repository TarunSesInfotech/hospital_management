/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const mobile = localStorage.getItem("patientMobile");

    if (!mobile) {
      router.push("/register");
      return;
    }

    fetch("/api/patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setPatient(data);
        }
      });
  }, [router]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!patient) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Patient Details
        </h2>

        <p><strong>Name:</strong> {patient.fullName}</p>
        <p><strong>Mobile:</strong> {patient.mobile}</p>
        <p><strong>Aadhar:</strong> {patient.aadhar}</p>
        <p><strong>Registered At:</strong> {new Date(patient.createdAt).toLocaleString()}</p>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/register");
          }}
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
