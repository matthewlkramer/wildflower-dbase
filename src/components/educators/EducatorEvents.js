import React from "react";
import { useUnifiedData } from "../../hooks/useUnifiedData";

const EducatorEvents = ({ educator }) => {
  const { data: events, loading } = useUnifiedData("eventattendance", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Registration Date", direction: "desc" }
  });

  if (loading) return <div>Loading...</div>;
  if (!events.length) return <div>No events found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1">Event</th>
            <th className="px-2 py-1">Registration Date</th>
            <th className="px-2 py-1">Role</th>
            <th className="px-2 py-1">Notes</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td className="px-2 py-1">{e.eventName}</td>
              <td className="px-2 py-1">{e.registrationDate}</td>
              <td className="px-2 py-1">{e.role}</td>
              <td className="px-2 py-1">{e.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EducatorEvents;
