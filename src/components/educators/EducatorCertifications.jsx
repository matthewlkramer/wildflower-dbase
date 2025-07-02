import React from "react";
import { useUnifiedData } from "../../hooks/useUnifiedData";

const EducatorCertifications = ({ educator }) => {
  const { data: certs, loading } = useUnifiedData("montessoricerts", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Year Certified", direction: "desc" }
  });

  if (loading) return <div>Loading...</div>;
  if (!certs.length) return <div>No certifications found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1">Certification</th>
            <th className="px-2 py-1">Level</th>
            <th className="px-2 py-1">Year</th>
            <th className="px-2 py-1">Certifier</th>
          </tr>
        </thead>
        <tbody>
          {certs.map((c) => (
            <tr key={c.id}>
              <td className="px-2 py-1">{c.certificationType}</td>
              <td className="px-2 py-1">{c.level}</td>
              <td className="px-2 py-1">{c.yearCertified}</td>
              <td className="px-2 py-1">{c.certifier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EducatorCertifications;
