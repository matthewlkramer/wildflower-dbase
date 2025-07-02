import React from 'react';

const SchoolGovernance = ({ boardMembers, governanceDocs }) => (
  <div className="flex gap-8">
    {/* Board Members Table */}
    <div className="w-1/2">
      <h2 className="font-semibold text-lg mb-2">Board Members</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {boardMembers && boardMembers.length ? boardMembers.map(bm => (
            <tr key={bm.id}>
              <td>{bm.fullName || bm.name}</td>
              <td>{bm.role}</td>
              <td>{bm.startDate}</td>
              <td>{bm.endDate}</td>
            </tr>
          )) : <tr><td colSpan={4} className="text-center">No board members found</td></tr>}
        </tbody>
      </table>
    </div>
    {/* Governance Documents Table */}
    <div className="w-1/2">
      <h2 className="font-semibold text-lg mb-2">Governance Documents</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Document</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {governanceDocs && governanceDocs.length ? governanceDocs.map(doc => (
            <tr key={doc.id}>
              <td>{doc.documentType}</td>
              <td>{doc.date}</td>
              <td>
                {doc.doc
                  ? <a href={Array.isArray(doc.doc) ? doc.doc[0]?.url : doc.doc} target="_blank" rel="noopener noreferrer">View</a>
                  : '-'}
              </td>
              <td>{doc.docNotes}</td>
            </tr>
          )) : <tr><td colSpan={4} className="text-center">No governance documents found</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

export default SchoolGovernance;
