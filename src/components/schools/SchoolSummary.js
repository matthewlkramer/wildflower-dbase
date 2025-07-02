import React, { useState } from 'react';
import Pills from '../shared/Pills';
import StatusBadge from '../shared/StatusBadge';

const SchoolSummary = ({ school }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!school) return null;

  return (
    <div className="space-y-8">
      {/* Edit Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center text-sm"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Header Section */}
      <div className="grid grid-cols-4 gap-x-6 gap-y-2">
        {/* Logo */}
        <div className="row-span-3 flex items-center justify-center">
          {school.logoThumbnail || school.logo ? (
            <img
              src={school.logoThumbnail || school.logo}
              alt={`${school.name} logo`}
              className="w-32 h-32 object-contain rounded-lg"
              onError={e => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Logo</span>
            </div>
          )}
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-2">
          <DetailRow label="School Name" value={school.name} />
          <DetailRow label="Short Name" value={school.shortName} />
          <DetailRow label="Ages Served" value={<Pills values={school.agesServed} colorScheme="teal" />} />
          <DetailRow label="Governance Model" value={school.governanceModel} />
          <DetailRow label="Founders" value={<Pills values={school.founders} />} />
          <DetailRow label="Current TLs" value={<Pills values={school.currentTLs} colorScheme="blue" />} />
          <DetailRow label="Open Date" value={school.opened} />
          <DetailRow label="School Status" value={<StatusBadge status={school.schoolStatus} />} />
          <DetailRow label="Membership Status" value={<StatusBadge status={school.membershipStatus} />} />
        </div>
      </div>
      {/* Additional Info */}
      <div className="grid grid-cols-4 gap-x-6 gap-y-2">
        <DetailRow label="Program Focus" value={<Pills values={school.programFocus} colorScheme="green" />} />
        <DetailRow label="Max Capacity" value={school.maxCapacityEnrollments} />
        <DetailRow label="Number of Classrooms" value={school.numberOfClassrooms} />
        <DetailRow label="Public Funding" value={<Pills values={school.publicFundingSources} colorScheme="indigo" />} />
        <DetailRow label="Flexible Tuition" value={school.flexibleTuitionModel ? "Yes" : "No"} />
        <DetailRow label="School Calendar" value={school.schoolCalendar} />
        <DetailRow label="School Schedule" value={<Pills values={school.schoolSchedule} colorScheme="yellow" />} />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="py-1">
    <span className="block text-xs font-medium text-gray-500">{label}</span>
    <span className="block text-base text-gray-900">{value || '-'}</span>
  </div>
);

export default SchoolSummary;
