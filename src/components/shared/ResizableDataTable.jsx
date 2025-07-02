// shared/ResizableDataTable.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

function getUniqueValues(data, accessorKey) {
  const values = new Set();
  data.forEach(row => {
    let v = row[accessorKey];
    if (Array.isArray(v)) v.forEach(i => values.add(i));
    else if (v !== undefined && v !== null && v !== '') values.add(v);
  });
  return Array.from(values);
}

const SEARCH_FIELDS = ['shortName', 'name', 'locality', 'geography'];

function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

export default function ResizableDataTable({
  data = [],
  columns = [],
  onRowClick,
  loading = false,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const dropdownRef = useRef();
  useClickOutside(dropdownRef, () => setOpenDropdown(null));

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      // Search all string fields for the filter value
      if (!filterValue) return true;
      return Object.values(row.original).some(v =>
        typeof v === 'string' && v.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    columnFilterFns: {
      // For search fields, use a contains filter
      ...Object.fromEntries(
        SEARCH_FIELDS.map(f => [f, (row, id, filterValue) => {
          if (!filterValue) return true;
          const v = row.getValue(id);
          return v && v.toLowerCase().includes(filterValue.toLowerCase());
        }])
      ),
      // For others, use array includes or is empty
      default: (row, id, filterValue) => {
        const v = row.getValue(id);
        if (!filterValue || filterValue.length === 0) return true;
        if (filterValue.includes('__EMPTY__')) {
          if (Array.isArray(v)) return v.length === 0;
          return v === undefined || v === null || v === '';
        }
        if (Array.isArray(v)) return v.some(val => filterValue.includes(val));
        return filterValue.includes(v);
      }
    }
  });

  // Helper to update filter value for a column
  function setColFilter(colId, value) {
    setColumnFilters(filters => {
      const others = filters.filter(f => f.id !== colId);
      if (!value || (Array.isArray(value) && value.length === 0) || value === '') return others;
      return [...others, { id: colId, value }];
    });
  }

  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow max-w-none">
      <div className="flex items-center justify-end gap-2 px-2 py-2 border-b bg-gray-50">
        <input
          type="text"
          className="border rounded px-2 py-1 text-sm w-48"
          placeholder="Search all records..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
        />
        <button
          className="text-sm px-3 py-1 rounded bg-teal-100 text-teal-700 hover:bg-teal-200 flex items-center gap-1"
          onClick={() => setShowFilters(f => !f)}
          title="Show filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" /></svg>
          Filter
        </button>
        <button
          className="text-sm px-3 py-1 rounded bg-[#14b8a6] text-white font-bold hover:bg-[#0e8074] flex items-center gap-1 border border-[#0e8074] shadow"
          onClick={() => alert('Add new record')}
        >
          + Add Record
        </button>
      </div>
      <table className="min-w-full table-auto border-collapse divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const sorted = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-xs font-semibold text-gray-600 bg-gray-50 uppercase tracking-wider whitespace-nowrap cursor-pointer select-none relative"
                    style={{ width: header.getSize?.() || 'auto', minWidth: 100 }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {sorted === 'asc' && <span> ▲</span>}
                      {sorted === 'desc' && <span> ▼</span>}
                      {sorted === false && <span className="opacity-30"> ⇅</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
          {showFilters && (
            <tr>
              {table.getAllLeafColumns().map(col => {
                const colId = col.id;
                const uniqueVals = getUniqueValues(data, colId);
                const filterValue = table.getColumn(colId)?.getFilterValue() || (SEARCH_FIELDS.includes(colId) ? '' : []);
                const isSearch = SEARCH_FIELDS.includes(colId);
                if (isSearch) {
                  return (
                    <th key={colId} className="bg-gray-50 px-2 py-1">
                      <input
                        type="text"
                        className="w-full border rounded px-1 py-0.5 text-xs"
                        placeholder="Search..."
                        value={filterValue}
                        onChange={e => setColFilter(colId, e.target.value)}
                      />
                    </th>
                  );
                }
                // Multi-select dropdown with checkboxes
                return (
                  <th key={colId} className="bg-gray-50 px-2 py-1 relative">
                    <div className="relative">
                      <button
                        className="w-full border rounded px-1 py-0.5 text-xs text-left bg-white hover:bg-gray-100"
                        onClick={() => setOpenDropdown(openDropdown === colId ? null : colId)}
                        type="button"
                      >
                        {filterValue.length === 0 ? '(All)' : filterValue.includes('__EMPTY__') ? '(Is empty)' : filterValue.join(', ')}
                      </button>
                      {openDropdown === colId && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-30 bg-white border rounded shadow p-2 mt-1 left-0 min-w-[180px] max-h-60 overflow-auto"
                        >
                          <label className="block text-xs mb-1 font-semibold">Filter {colId}</label>
                          <div className="flex flex-col gap-1">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={filterValue.length === 0}
                                onChange={() => setColFilter(colId, [])}
                              />
                              (All)
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={filterValue.includes('__EMPTY__')}
                                onChange={() => {
                                  let next = filterValue.includes('__EMPTY__')
                                    ? filterValue.filter(v => v !== '__EMPTY__')
                                    : [...filterValue, '__EMPTY__'];
                                  setColFilter(colId, next);
                                }}
                              />
                              (Is empty)
                            </label>
                            {uniqueVals.map(val => (
                              <label key={val} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={filterValue.includes(val)}
                                  onChange={() => {
                                    let next = filterValue.includes(val)
                                      ? filterValue.filter(v => v !== val)
                                      : [...filterValue, val];
                                    setColFilter(colId, next);
                                  }}
                                />
                                {val || '(Empty)'}
                              </label>
                            ))}
                          </div>
                          <div className="flex justify-end mt-2">
                            <button
                              className="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                              onClick={() => setOpenDropdown(null)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="hover:bg-cyan-50 cursor-pointer transition-colors"
              onClick={() => onRowClick && onRowClick(row.original)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onRowClick && onRowClick(row.original);
                }
              }}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
