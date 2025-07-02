import React from "react";
import Pills from "../shared/Pills";

const SchoolGuides = ({ school }) => {
  if (!school.guides || school.guides.length === 0)
    return <div className="text-gray-500">No guides assigned.</div>;

  return (
    <div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Guide</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Start</th>
            <th className="text-left p-2">End</th>
            <th className="text-left p-2">Active?</th>
          </tr>
        </thead>
        <tbody>
          {school.guides.map((g) => (
            <tr key={g.id} className="border-b">
              <td className="p-2">{g.guideShortName}</td>
              <td className="p-2">{g.type}</td>
              <td className="p-2">{g.startDate}</td>
              <td className="p-2">{g.endDate || "-"}</td>
              <td className="p-2">{g.currentlyActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolGuides;