"use client";

export default function SlipPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 print:bg-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 print:shadow-none">
        <h2 className="text-2xl font-bold text-center mb-6">
          Hospital Payment Slip
        </h2>

        <div className="space-y-3 text-lg">
          <p><strong>Patient Name:</strong> John Doe</p>
          <p><strong>Doctor Name:</strong> Dr. Smith</p>
          <p><strong>Service:</strong> General Checkup</p>
          <p><strong>Token No:</strong> 12345</p>
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 print:hidden"
        >
          Print Slip
        </button>
      </div>
    </div>
  );
}
