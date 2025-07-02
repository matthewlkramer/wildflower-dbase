import React from 'react';

// Placeholder for SchoolDetails tab content
const SchoolDetails = ({ school }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">School Details</h2>
      <p className="text-gray-600">Details for this school will appear here.</p>
      {school && (
        <pre className="mt-4 bg-gray-50 p-2 rounded text-xs text-gray-700 border">
          {JSON.stringify(school, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default SchoolDetails;
