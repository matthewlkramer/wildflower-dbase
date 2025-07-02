// shared/ResizableDataTable.jsx
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function ResizableDataTable({
  data = [],
  columns = [],
  onRowClick,
  loading = false,
  tableKey = 'default',
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: false,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 italic">
        No records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-600 bg-gray-50 uppercase tracking-wider whitespace-nowrap"
                  style={{
                    width: header.getSize?.() || 'auto',
                    minWidth: 100,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
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
