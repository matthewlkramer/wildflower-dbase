import React from "react";
import DetailRow from "../shared/DetailRow";

const EducatorCultivation = ({ educator }) => {
  if (!educator) return null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-x-6 gap-y-2">
        <DetailRow label="First Contact: Relocate?" value={educator.firstContactRelocate} />
        <DetailRow label="First Contact: Governance Interest" value={educator.firstContactGovernance} />
        <DetailRow label="First Contact: Pre-WF Employment" value={educator.firstContactPreWFEmployment} />
        <DetailRow label="First Contact: WF School Employee?" value={educator.firstContactWFSchoolEmployee} />
        <DetailRow label="First Contact: Ages Interested In" value={educator.firstContactAges?.join(", ")} />
        <DetailRow label="First Contact: Initial Interests" value={educator.firstContactInterests} />
      </div>
    </div>
  );
};
export default EducatorCultivation;
