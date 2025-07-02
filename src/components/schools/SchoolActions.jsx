import React from 'react';

const SchoolActions = ({ notes, actions }) => (
  <div className="flex gap-8">
    <div className="w-1/2">
      <h2 className="font-semibold text-lg mb-2">Notes</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Date</th>
            <th>By</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes && notes.length ? notes.map(note => (
            <tr key={note.id}>
              <td>{note.createdDate}</td>
              <td>{note.createdBy}</td>
              <td>{note.noteText}</td>
            </tr>
          )) : <tr><td colSpan={3} className="text-center">No notes found</td></tr>}
        </tbody>
      </table>
    </div>
    <div className="w-1/2">
      <h2 className="font-semibold text-lg mb-2">Action Steps</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Item</th>
            <th>Status</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {actions && actions.length ? actions.map(a => (
            <tr key={a.id}>
              <td>{a.dueDate}</td>
              <td>{a.item}</td>
              <td>{a.status}</td>
              <td>{a.assigneeShortName}</td>
            </tr>
          )) : <tr><td colSpan={4} className="text-center">No action steps found</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

export default SchoolActions;
