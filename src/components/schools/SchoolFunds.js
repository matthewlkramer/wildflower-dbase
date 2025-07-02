import React from 'react';

const SchoolFunds = ({ grants, loans }) => (
  <div className="flex gap-8">
    {/* Grants */}
    <div className="w-1/2">
      <h2 className="font-semibold text-lg mb-2">Grants</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Issue Date</th>
            <th>Source</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {grants && grants.length ? grants.map(grant => (
            <tr key={grant.id}>
              <td>{grant.amount}</td>
              <td>{grant.issueDate}</td>
              <td>{grant.fundingSource}</td>
              <td>{grant.status}</td>
              <td>{grant.notes}</td>
            </tr>
          )) : <tr><td colSpan={5} className="text-center">No grants found</td></tr>}
        </tbody>
      </table>
    </div>
    {/* Loans */}
    <div className="w-1/2">
      <h2 className="font-semibold text-lg mb-2">Loans</h2>
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Issue Date</th>
            <th>Maturity</th>
            <th>Interest Rate</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {loans && loans.length ? loans.map(loan => (
            <tr key={loan.id}>
              <td>{loan.amount}</td>
              <td>{loan.issueDate}</td>
              <td>{loan.maturityDate}</td>
              <td>{loan.interestRate}</td>
              <td>{loan.status}</td>
              <td>{loan.notes}</td>
            </tr>
          )) : <tr><td colSpan={6} className="text-center">No loans found</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

export default SchoolFunds;
