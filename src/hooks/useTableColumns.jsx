import { useMemo } from 'react';
import Pills from '../components/shared/Pills';

// Optionally, customize which fields to show and how, per table type
const FIELD_CONFIG = {
  schools: [
    { key: 'shortName', label: 'Name' },
    { key: 'schoolStatus', label: 'Status' },
    { key: 'governanceModel', label: 'Governance' },
    { key: 'agesServed', label: 'Ages Served', pill: true },
    { key: 'locality', label: 'Geography'},
    { key: 'membershipStatus', label: 'Member?'},
  ],
  educators: [
    { key: 'fullName', label: 'Name' },
    { key: 'currentSchool', label: 'Current School' },
    { key: 'currentSchoolStageStatus', label: 'Stage/Status' },
    { key: 'currentRole', label: 'Current Role', pill: true },
    { key: 'contactEmail', label: 'Email'},
    { key: 'raceEthnicity', label: 'Race/Ethnicity', pill: true },
    { key: 'discoveryStatus', label: 'Discovery Status'},
    { key: 'individualType', label: 'Type'},
    // Add more...
  ],
  charters: [
    { key: 'name', label: 'Charter Name' },
    { key: 'shortName', label: 'Short Name' },
    { key: 'status', label: 'Status' },
    { key: 'initialTargetCommunity', label: 'Initial Target Community' },
  ],
  // Add more entity configs as needed
};

export function useTableColumns(entityType = 'schools') {
  // Memoize for performance
  return useMemo(() => {
    // Normalize entityType to string and fallback if not found
    let key = typeof entityType === 'string' ? entityType.toLowerCase() : 'schools';
    if (!FIELD_CONFIG[key]) {
      console.warn('Unknown entityType for columns:', entityType, 'falling back to schools');
      key = 'schools';
    }
    const fields = FIELD_CONFIG[key] || [];
    console.log('useTableColumns entityType:', entityType, 'key:', key, 'fields:', fields);
    if (!fields.length) {
      console.warn('No fields found for entityType:', entityType);
    }
    return fields.map(field => ({
      accessorKey: field.key, // <-- TanStack Table expects accessorKey
      header: field.label,
      cell: info => {
        const value = info.getValue();
        // DEBUG: Show value in console
        // console.log('cell', field.key, value, info.row.original);
        if (field.pill && (Array.isArray(value) || typeof value === 'string')) {
          return <Pills values={value} />;
        }
        if (typeof value === 'boolean') {
          return value ? 'Yes' : 'No';
        }
        if (value === null || value === undefined || value === '') {
          return '-';
        }
        return value;
      },
      // For debugging, also add a basic enableSorting: true
      enableSorting: true
    }));
  }, [entityType]);
}

export default useTableColumns;
