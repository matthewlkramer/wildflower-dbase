import React from "react";
import { useUnifiedData } from "../../hooks/useUnifiedData";

const EducatorNotes = ({ educator }) => {
  const { data: notes, loading } = useUnifiedData("educatornotes", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Date", direction: "desc" }
  });

  if (loading) return <div>Loading...</div>;
  if (!notes.length) return <div>No notes found.</div>;

  return (
    <div className="space-y-2">
      {notes.map((n) => (
        <div key={n.id} className="p-2 bg-gray-50 border rounded">
          <div className="text-xs text-gray-500 mb-1">{n.date}</div>
          <div className="font-semibold">{n.title}</div>
          <div>{n.noteText}</div>
        </div>
      ))}
    </div>
  );
};
export default EducatorNotes;
