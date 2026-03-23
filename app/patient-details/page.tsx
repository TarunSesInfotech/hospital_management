/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [error, setError] = useState("");

  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [token, setToken] = useState<number | null>(null);

  const hospitalName = "MGH Hospital";

  const services = ["Cardiology", "Orthopedics", "Neurology", "Pediatrics"];

  const doctors = [
    { name: "Dr. Sharma", service: "Cardiology" },
    { name: "Dr. Mehta", service: "Orthopedics" },
    { name: "Dr. Khan", service: "Neurology" },
    { name: "Dr. Priya", service: "Pediatrics" },
    { name: "Dr. Arjun", service: "Cardiology" },
  ];

  const filteredDoctors = selectedService
    ? doctors.filter((doc) => doc.service === selectedService)
    : [];

  useEffect(() => {
    const mobile = localStorage.getItem("patientMobile");

    if (!mobile) {
      router.push("/register");
      return;
    }

    fetch("/api/patient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  const generateToken = async () => {
    const mobile = localStorage.getItem("patientMobile");

    const res = await fetch("/api/generate-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile,
        doctor: selectedDoctor,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setToken(data.tokenNumber);
      localStorage.setItem("slipData", JSON.stringify({
        patientName: patient?.fullName,
        doctorName: selectedDoctor,
        service: selectedService,
        tokenNumber: data.tokenNumber,
      }));
    } else {
      alert(data.message);
    }
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!patient) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex flex-wrap justify-between font-medium">
          <p>
            <strong>Name:</strong> {patient.fullName}
          </p>
          <p>
            <strong>Mobile:</strong> {patient.mobile}
          </p>
          <p>
            <strong>Aadhar:</strong> {patient.aadhar}
          </p>
        </div>

        <hr className="my-6" />

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {hospitalName}
        </h2>

        <select
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            setSelectedDoctor("");
          }}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="">-- Select Service --</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        {selectedService && (
          <>
            <select
              className="w-full border p-3 rounded-lg mb-3"
              onChange={(e) => setSelectedDoctor(e.target.value)}
              value={selectedDoctor}
            >
              <option value="">-- Select Doctor --</option>
              {filteredDoctors.map((doc) => (
                <option key={doc.name} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>

            {selectedDoctor && (
              <button
                onClick={generateToken}
                className="w-full bg-green-600 text-white p-3 rounded-lg"
              >
                Generate Token
              </button>
            )}
          </>
        )}

        {token && (
          <div className="mt-6 p-4 bg-yellow-100 text-center rounded-lg">
            <h3 className="text-lg font-bold text-yellow-700">
              Your Token Number
            </h3>
            <p className="text-4xl font-extrabold text-yellow-800 mt-2">
              {token}
            </p>
            <button
              onClick={() => router.push("/slip")}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              View Slip
            </button>
          </div>
        )}

        <button
          onClick={() => router.push("/payment")}
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
