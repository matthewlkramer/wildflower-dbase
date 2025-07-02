// src/components/schools/SchoolMembership.jsx
import React, { useState } from 'react';

const SchoolMembership = ({
  annualRecords = [],
  feeUpdates = [],
}) => {
  const [selectedAnnualId, setSelectedAnnualId] = useState(
    annualRecords.length > 0 ? annualRecords[0].id : null
  );

  const selectedAnnual = annualRecords.find(rec => rec.id === selectedAnnualId);

  return (
    <div className="flex gap-4">
      {/* LEFT: Annual Records Table */}
      <div className="flex-1">
        <h3 className="font-semibold mb-2">Membership Fee Annual Records</h3>
        <table className="min-w-full border rounded text-xs">
          <thead>
            <tr>
              <th>School Year</th>
              <th>Status</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {annualRecords.map(rec => (
              <tr
                key={rec.id}
                className={`cursor-pointer ${rec.id === selectedAnnualId ? 'bg-teal-50' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedAnnualId(rec.id)}
              >
                <td>{rec.schoolYear}</td>
                <td>{rec.status || '-'}</td>
                <td>{rec.annualFee || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MIDDLE: Fee Updates Table */}
      <div className="flex-1">
        <h3 className="font-semibold mb-2">Fee Updates</h3>
        <table className="min-w-full border rounded text-xs">
          <thead>
            <tr>
              <th>Date</th>
              <th>Updated Fee</th>
              <th>Reason</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            {feeUpdates.map(update => (
              <tr key={update.id}>
                <td>{update.updatedAt}</td>
                <td>{update.updatedFee}</td>
                <td>{update.reason || '-'}</td>
                <td>{update.updatedBy || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT: Annual Record Details */}
      <div className="flex-1 bg-gray-50 rounded p-4">
        <h3 className="font-semibold mb-2">Annual Record Details</h3>
        {selectedAnnual ? (
          <div className="space-y-2 text-sm">
            <div><strong>School Year:</strong> {selectedAnnual.schoolYear}</div>
            <div><strong>Status:</strong> {selectedAnnual.status}</div>
            <div><strong>Annual Fee:</strong> {selectedAnnual.annualFee}</div>
            <div><strong>Exemption Status:</strong> {selectedAnnual.exemptionStatus}</div>
            <div><strong>Payments:</strong> {selectedAnnual.totalPayments}</div>
            <div><strong>Notes:</strong> {selectedAnnual.notes || '-'}</div>
            {/* Add/remove fields as needed */}
          </div>
        ) : (
          <div className="text-gray-500">Select a year to view details.</div>
        )}
      </div>
    </div>
  );
};

export default SchoolMembership;
