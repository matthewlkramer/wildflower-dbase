import React from 'react';
import Pills from '../shared/Pills';

const SchoolLocations = ({ locations }) => {
  if (!locations || !locations.length) {
    return <div>No locations found for this school.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded">
        <thead>
          <tr>
            <th>Address</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Sq Ft</th>
            <th>Mailing?</th>
            <th>Physical?</th>
            <th>Neighborhood</th>
            <th>Colocation</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(loc => (
            <tr key={loc.id}>
              <td>{loc.address}</td>
              <td>{loc.locationType}</td>
              <td>{loc.city}</td>
              <td>{loc.state}</td>
              <td>{loc.startDate}</td>
              <td>{loc.endDate}</td>
              <td>{loc.squareFeet}</td>
              <td>{loc.currentMailingAddress ? "Yes" : ""}</td>
              <td>{loc.currentPhysicalAddress ? "Yes" : ""}</td>
              <td>{loc.neighborhood}</td>
              <td>{loc.coLocationType || loc.coLocationPartner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolLocations;
