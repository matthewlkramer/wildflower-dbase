// src/components/schools/SchoolEducators.jsx
import React from 'react';
import Pills from '../shared/Pills';

const SchoolEducators = ({ educatorStints }) => {
  if (!educatorStints || !educatorStints.length) {
    return <div>No educators currently associated with this school.</div>;
  }

  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Educators at this School</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role(s)</th>
            <th>SSJ Stage</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Email at School</th>
            <th>Slack?</th>
            {/* Add/remove columns as needed */}
          </tr>
        </thead>
        <tbody>
          {educatorStints.map(stint => (
            <tr key={stint.id}>
              <td>{stint.educatorName}</td>
              <td><Pills values={stint.roles} /></td>
              <td>{stint.ssjStage}</td>
              <td>{stint.currentlyActive ? "Active" : ""}</td>
              <td>{stint.startDate}</td>
              <td>{stint.endDate}</td>
              <td>{stint.emailAtSchool}</td>
              <td>{stint.onSlack || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolEducators;
