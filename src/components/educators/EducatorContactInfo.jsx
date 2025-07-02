import React from "react";
import DetailRow from "../shared/DetailRow";

const EducatorContactInfo = ({ educator }) => {
  if (!educator) return null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-x-6 gap-y-2">
        <DetailRow label="Contact Email" value={educator.contactEmail} />
        <DetailRow label="Email Addresses" value={(educator.emailAddresses || []).join(", ")} />
        <DetailRow label="Primary Phone" value={educator.primaryPhone} />
        <DetailRow label="Secondary Phone" value={educator.secondaryPhone} />
        <DetailRow label="Home Address" value={educator.homeAddress} />
        <DetailRow label="Exclude From Email Logging" value={educator.excludeFromEmailLogging ? "Yes" : "No"} />
      </div>
    </div>
  );
};
export default EducatorContactInfo;
