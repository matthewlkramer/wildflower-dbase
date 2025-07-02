import React from "react";

const SchoolActions = ({ school }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-lg font-semibold mb-2">Notes</h2>
      {(!school.notes || school.notes.length === 0) ? (
        <div className="text-gray-500">No notes found.</div>
      ) : (
        <ul className="space-y-2">
          {school.notes.map((note) => (
            <li key={note.id} className="bg-gray-100 rounded p-3">
              <div className="text-sm text-gray-600">{note.createdDate}</div>
              <div className="font-medium">{note.noteText}</div>
              <div className="text-xs text-gray-500">By: {note.createdBy}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div>
      <h2 className="text-lg font-semibold mb-2">Action Steps</h2>
      {(!school.actionSteps || school.actionSteps.length === 0) ? (
        <div className="text-gray-500">No action steps found.</div>
      ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Assignee</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {school.actionSteps.map((step) => (
              <tr key={step.id} className="border-b">
                <td className="p-2">{step.item}</td>
                <td className="p-2">{step.assigneeShortName}</td>
                <td className="p-2">{step.status}</td>
                <td className="p-2">{step.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export default SchoolActions;
