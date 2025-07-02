import React from "react";
import { useUnifiedData } from "../../hooks/useUnifiedData";
import Pills from "../shared/Pills";

const EducatorSchoolStints = ({ educator }) => {
  const { data: stints, loading } = useUnifiedData("educatorsxschools", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Start Date", direction: "desc" }
  });

  if (loading) return <div>Loading...</div>;
  if (!stints.length) return <div>No school stints found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left font-semibold">School</th>
            <th className="px-2 py-1 text-left font-semibold">Start Date</th>
            <th className="px-2 py-1 text-left font-semibold">End Date</th>
            <th className="px-2 py-1 text-left font-semibold">Roles</th>
            <th className="px-2 py-1 text-left font-semibold">SSJ Stage</th>
            <th className="px-2 py-1 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {stints.map((s) => (
            <tr key={s.id}>
              <td className="px-2 py-1">{s.schoolShortName}</td>
              <td className="px-2 py-1">{s.startDate}</td>
              <td className="px-2 py-1">{s.endDate}</td>
              <td className="px-2 py-1"><Pills values={s.roles} colorScheme="teal" /></td>
              <td className="px-2 py-1">{s.ssjStage}</td>
              <td className="px-2 py-1">{s.schoolStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EducatorSchoolStints;
