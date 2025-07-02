import React from 'react';

const SchoolGuides = ({ guides }) => (
  <div>
    <h2 className="font-semibold text-lg mb-4">Guide Assignments</h2>
    <table className="min-w-full border rounded">
      <thead>
        <tr>
          <th>Guide Name</th>
          <th>Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {guides && guides.length ? guides.map(guide => (
          <tr key={guide.id}>
            <td>{guide.guideShortName}</td>
            <td>{guide.type}</td>
            <td>{guide.startDate}</td>
            <td>{guide.endDate}</td>
            <td>{guide.currentlyActive ? 'Active' : ''}</td>
          </tr>
        )) : <tr><td colSpan={5} className="text-center">No guide assignments found</td></tr>}
      </tbody>
    </table>
  </div>
);

export default SchoolGuides;
