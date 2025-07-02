import React from "react";
import DetailRow from "../shared/DetailRow";
import Pills from "../shared/Pills";

const EducatorDemographics = ({ educator }) => {
  if (!educator) return null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-x-6 gap-y-2">
        <DetailRow label="Pronouns" value={educator.pronouns || educator.pronounsOther} />
        <DetailRow label="Race & Ethnicity" value={<Pills values={educator.raceEthnicity} />} />
        <DetailRow label="Race & Ethnicity (Other)" value={educator.raceEthnicityOther} />
        <DetailRow label="Gender" value={educator.gender || educator.genderOther} />
        <DetailRow label="LGBTQIA+" value={educator.lgbtqia ? "Yes" : "No"} />
        <DetailRow label="Household Income" value={educator.householdIncome} />
        <DetailRow label="Income Background" value={educator.incomeBackground} />
        <DetailRow label="Educational Attainment" value={educator.educationalAttainment} />
        <DetailRow label="Primary Language" value={educator.primaryLanguage} />
        <DetailRow label="Other Languages" value={<Pills values={educator.otherLanguages} />} />
      </div>
    </div>
  );
};
export default EducatorDemographics;
