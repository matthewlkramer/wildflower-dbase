import React from 'react';
import { X } from 'lucide-react';

// Shared color schemes
const colorSchemes = {
  default: 'bg-gray-100 text-gray-700 border-gray-300',
  blue: 'bg-blue-50 text-blue-700 border-blue-300',
  teal: 'bg-teal-50 text-teal-700 border-teal-300',
  green: 'bg-green-50 text-green-700 border-green-300',
  purple: 'bg-purple-50 text-purple-700 border-purple-300',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-300',
  red: 'bg-red-50 text-red-700 border-red-300',
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-300',
  pink: 'bg-pink-50 text-pink-700 border-pink-300',
};

// Helper to dedupe and clean
const unique = (arr = []) =>
  Array.from(new Set(arr.filter(Boolean && ((x) => typeof x === "string" ? x.trim() : true))));

// --- Display Only Pills ---
export const Pills = ({ values, colorScheme = 'default', abbreviateFn }) => {
  if (!values || (Array.isArray(values) && values.length === 0)) return '-';
  const items = unique(Array.isArray(values) ? values : [values]);

  // If provided, map items through abbreviate function (eg, for race/ethnicity)
  const displayItems = abbreviateFn ? items.map(abbreviateFn) : items;
  const colors = colorSchemes[colorScheme] || colorSchemes.default;

  return (
    <div className="flex flex-wrap gap-1">
      {displayItems.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

// --- Editable Pills ---
export const EditablePills = ({
  values,
  onRemove,
  colorScheme = 'default',
  abbreviateFn,
}) => {
  if (!values || (Array.isArray(values) && values.length === 0)) return null;
  const items = unique(Array.isArray(values) ? values : [values]);
  const displayItems = abbreviateFn ? items.map(abbreviateFn) : items;
  const colors = colorSchemes[colorScheme] || colorSchemes.default;

  return (
    <div className="flex flex-wrap gap-1">
      {displayItems.map((item, idx) => (
        <span
          key={`${item}-${idx}`}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors} cursor-pointer`}
        >
          {item}
          <button
            type="button"
            className="ml-1 text-gray-400 hover:text-red-500"
            onClick={() => onRemove(items[idx])}
            tabIndex={-1}
            aria-label={`Remove ${item}`}
          >
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  );
};

// Optionally, you can default-export Pills, or just import { Pills, EditablePills } as needed.
export default Pills;
