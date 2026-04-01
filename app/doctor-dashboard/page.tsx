/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [doctor, setDoctor] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorData = localStorage.getItem("doctorData");

    if (!doctorData) {
      router.push("/doctor-login");
      return;
    }

    const parsedDoctor = JSON.parse(doctorData);
    setDoctor(parsedDoctor);

    fetch("/api/doctor-patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorName: `Dr. ${parsedDoctor.fullName.split(" ")[1] || parsedDoctor.fullName}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.patients || []);
        setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("doctorData");
    router.push("/doctor-login");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Doctor Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-black px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {doctor && (
          <div className="bg-black p-4 rounded-xl shadow mb-6">
            <p><strong>Name:</strong> {doctor.fullName}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Mobile:</strong> {doctor.mobile}</p>
          </div>
        )}

        <div className="bg-black p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Today&apos;s Patients</h2>
          
          {patients.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No patients today</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black">
                  <th className="border p-3 text-left">Token</th>
                  <th className="border p-3 text-left">Patient Name</th>
                  <th className="border p-3 text-left">Mobile</th>
                  <th className="border p-3 text-left">Service</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index} className="border">
                    <td className="border p-3 font-bold text-lg">{patient.tokenNumber}</td>
                    <td className="border p-3">{patient.fullName}</td>
                    <td className="border p-3">{patient.mobile}</td>
                    <td className="border p-3">{patient.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
