import React from "react";

const SchoolFunds = ({ school }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-lg font-semibold mb-2">Grants</h2>
      {(!school.grants || school.grants.length === 0) ? (
        <div className="text-gray-500">No grants found.</div>
      ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Issued By</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Issue Date</th>
              <th className="p-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {school.grants.map((grant) => (
              <tr key={grant.id} className="border-b">
                <td className="p-2">${grant.amount}</td>
                <td className="p-2">{grant.issuedBy}</td>
                <td className="p-2">{grant.status}</td>
                <td className="p-2">{grant.issueDate}</td>
                <td className="p-2">{grant.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <div>
      <h2 className="text-lg font-semibold mb-2">Loans</h2>
      {(!school.loans || school.loans.length === 0) ? (
        <div className="text-gray-500">No loans found.</div>
      ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Issue Date</th>
              <th className="p-2 text-left">Maturity</th>
              <th className="p-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {school.loans.map((loan) => (
              <tr key={loan.id} className="border-b">
                <td className="p-2">${loan.amount}</td>
                <td className="p-2">{loan.status}</td>
                <td className="p-2">{loan.issueDate}</td>
                <td className="p-2">{loan.maturityDate}</td>
                <td className="p-2">{loan.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

export default SchoolFunds;
