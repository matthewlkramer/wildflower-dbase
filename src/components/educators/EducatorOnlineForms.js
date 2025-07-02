import React from "react";
import { useUnifiedData } from "../../hooks/useUnifiedData";

const EducatorOnlineForms = ({ educator }) => {
  const { data: forms, loading } = useUnifiedData("ssjfilloutforms", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Entry Date", direction: "desc" }
  });

  if (loading) return <div>Loading...</div>;
  if (!forms.length) return <div>No SSJ forms found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1">Entry Date</th>
            <th className="px-2 py-1">School</th>
            <th className="px-2 py-1">Notes</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((f) => (
            <tr key={f.id}>
              <td className="px-2 py-1">{f.entryDate}</td>
              <td className="px-2 py-1">{f.schoolShortName}</td>
              <td className="px-2 py-1">{f.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EducatorOnlineForms;
