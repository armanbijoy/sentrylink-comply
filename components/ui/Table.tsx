// components/ui/Table.tsx
import { ReactNode } from 'react';

interface TableProps<T> {
  columns: { key: string; label: string }[];
  data: T[];
  renderRow: (item: T) => ReactNode;
  selectable?: boolean;
  selectedItems?: string[];
  onSelectAll?: () => void;
  onSelectItem?: (id: string) => void;
}

export default function Table<T extends { id: string }>({
  columns,
  data,
  renderRow,
  selectable = false,
  selectedItems = [],
  onSelectAll,
  onSelectItem,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length && data.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => onSelectItem?.(item.id)}
                    className="rounded border-gray-300"
                  />
                </td>
              )}
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}