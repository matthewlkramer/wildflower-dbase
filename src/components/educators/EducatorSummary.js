import React from "react";
import DetailRow from "../shared/DetailRow";
import Pills from "../shared/Pills";
import StatusBadge from "../shared/StatusBadge";

const EducatorSummary = ({ educator }) => {
  if (!educator) return null;
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-x-6 gap-y-2">
        <DetailRow label="Full Name" value={educator.fullName} />
        <DetailRow label="Preferred Name" value={educator.nickname} />
        <DetailRow label="Current School" value={educator.currentSchool} />
        <DetailRow label="Current Role" value={educator.currentRole} />
        <DetailRow label="Currently Active?" value={<StatusBadge status={educator.currentlyActiveAtASchool ? "Active" : "Inactive"} />} />
        <DetailRow label="Discovery Status" value={educator.discoveryStatus} />
        <DetailRow label="Individual Type" value={educator.individualType} />
        <DetailRow label="Montessori Certified" value={educator.montessoriCertified ? "Yes" : "No"} />
        <DetailRow label="Montessori Lead Guide Training" value={educator.montessoriLeadGuideTraining} />
      </div>
    </div>
  );
};
export default EducatorSummary;
