// components/ui/StatusChip.tsx
import  { DocStatus } from '../../lib/types';

interface StatusChipProps {
  status: DocStatus;
}

const statusColors: Record<DocStatus, string> = {
  'Active': 'bg-green-100 text-green-800',
  'Expired': 'bg-red-100 text-red-800',
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  'Rejected': 'bg-gray-100 text-gray-800',
};

export default function StatusChip({ status }: StatusChipProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status}
    </span>
  );
}