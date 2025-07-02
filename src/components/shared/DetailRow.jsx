// src/components/shared/DetailRow.jsx
import React from "react";

const DetailRow = ({ label, value, className = "" }) => (
  <div className={`col-span-2 flex flex-col py-1 ${className}`}>
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    <span className="text-sm text-gray-900 break-words">{value ?? "-"}</span>
  </div>
);

export default DetailRow;
