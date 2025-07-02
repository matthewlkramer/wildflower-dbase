import React from "react";
import { useUnifiedData } from "../../hooks/useUnifiedData";

const EducatorInteractions = ({ educator }) => {
  // You may want to show emails/meetings in a subtable or tabs here
  const { data: emails, loading: loadingEmails } = useUnifiedData("emails", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Date", direction: "desc" }
  });
  const { data: meetings, loading: loadingMeetings } = useUnifiedData("meetings", {
    filterByFormula: `{Educator} = "${educator.id}"`,
    sort: { field: "Date", direction: "desc" }
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold mb-2">Emails</h3>
        {loadingEmails ? (
          <div>Loading...</div>
        ) : emails.length ? (
          <ul>
            {emails.map((e) => (
              <li key={e.id} className="mb-2">
                <div className="font-semibold">{e.subject}</div>
                <div className="text-xs text-gray-500">{e.date}</div>
                <div className="text-sm">{e.body}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No emails found.</div>
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-2">Meetings</h3>
        {loadingMeetings ? (
          <div>Loading...</div>
        ) : meetings.length ? (
          <ul>
            {meetings.map((m) => (
              <li key={m.id} className="mb-2">
                <div className="font-semibold">{m.title}</div>
                <div className="text-xs text-gray-500">{m.date}</div>
                <div className="text-sm">{m.notes}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No meetings found.</div>
        )}
      </div>
    </div>
  );
};
export default EducatorInteractions;
