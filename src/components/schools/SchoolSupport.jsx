import React from 'react';
import Pills from '../shared/Pills';

const SchoolSupport = ({ school }) => (
  <div className="grid grid-cols-2 gap-6">
    <Detail label="SSJ Stage" value={school.ssjStage} />
    <Detail label="Target City" value={school.ssjTargetCity} />
    <Detail label="Target State" value={school.ssjTargetState} />
    <Detail label="Original Projected Open Date" value={school.ssjOriginalProjectedOpenDate} />
    <Detail label="Projected Open" value={school.ssjProjectedOpen} />
    <Detail label="Projected Open School Year" value={school.ssjProjOpenSchoolYear} />
    <Detail label="Risk Factors" value={<Pills values={school.riskFactors} colorScheme="red" />} />
    <Detail label="Watchlist" value={<Pills values={school.watchlist} colorScheme="red" />} />
    <Detail label="Board Development" value={school.ssjBoardDevelopment} />
    <Detail label="Visioning Date" value={school.enteredVisioningDate} />
    <Detail label="Planning Date" value={school.enteredPlanningDate} />
    <Detail label="Startup Date" value={school.enteredStartupDate} />
    <Detail label="Has ETL Partner?" value={school.ssjHasETLPartner} />
    <Detail label="Ops Guide Track" value={<Pills values={school.ssjOpsGuideTrack} />} />
    <Detail label="Readiness to Open Rating" value={school.ssjReadinessRating} />
    <Detail label="Facility" value={school.ssjFacility} />
    <Detail label="B4G Firm/Attorney" value={school.building4GoodFirm} />
    <Detail label="Total Startup Funding Needed" value={school.ssjTotalStartupFunding} />
    <Detail label="Fundraising Narrative" value={school.ssjFundraisingNarrative} />
    <Detail label="Active Pod Member" value={school.activePodMember} />
    <Detail label="Cohorts" value={<Pills values={school.cohorts} />} />
    {/* Add/adjust fields as needed */}
  </div>
);

const Detail = ({ label, value }) => (
  <div>
    <div className="text-xs font-medium text-gray-500">{label}</div>
    <div className="text-base text-gray-900">{value || '-'}</div>
  </div>
);

export default SchoolSupport;
