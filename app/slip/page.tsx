/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
interface SlipData {
  patientName: string;
  doctorName: string;
  service: string;
  tokenNumber: number;
}

export default function SlipPage() {
  const [slipData, setSlipData] = useState<SlipData | null>(null);

  useEffect(() => {
    const savedSlipData = localStorage.getItem("slipData");
    if (savedSlipData) {
      setSlipData(JSON.parse(savedSlipData));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 md:p-10 print:bg-white print:p-0">
      {/* Slip Card */}
      <div className="slip w-full max-w-[360px] bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 print:shadow-none print:border-none print:rounded-none print:p-3">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-center mb-4 border-b pb-2">
          Hospital Payment Slip
        </h2>

        <div className="text-xs sm:text-sm space-y-3">
          <p className="flex justify-between gap-3 border-b pb-1">
            <strong>Date & Time: </strong>
            <span className="text-right">
              {new Date().toLocaleDateString("en-IN")} :{" "}
              {new Date().toLocaleTimeString("en-IN")}
            </span>
          </p>

          <p className="flex justify-between gap-3 border-b pb-1">
            <strong>Patient Name:</strong>
            <span className="text-right">{slipData?.patientName}</span>
          </p>

          <p className="flex justify-between gap-3 border-b pb-1">
            <strong>Doctor Name:</strong>
            <span className="text-right">{slipData?.doctorName}</span>
          </p>

          <p className="flex justify-between gap-3 border-b pb-1">
            <strong>Service:</strong>
            <span className="text-right">{slipData?.service}</span>
          </p>

          <p className="flex justify-between gap-3 border-b pb-1">
            <strong>Token No:</strong>
            <span className="text-right">{slipData?.tokenNumber}</span>
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="mt-5 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 print:hidden text-sm sm:text-base"
        >
          Print Slip
        </button>
      </div>

      <style jsx>{`
        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .page-wrapper {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: auto !important;
          }

          body * {
            visibility: hidden;
          }

          .slip,
          .slip * {
            visibility: visible;
          }

          .slip {
            position: absolute;
            left: 8px;
            top: 0;
            width: 80mm !important;
            max-width: 80mm !important;
            margin: 8px 0 !important;
            padding: 8px !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }

          @page {
            size: 80mm auto;
            margin: 8px 0;
          }
        }
      `}</style>
    </div>
  );
}
