// lib/data.ts
import { Evidence, Version, RequestItem } from './types';

export const mockEvidence: Evidence[] = [
  {
    id: '1',
    docName: 'ISO 9001 Certificate',
    docType: 'Certificate',
    status: 'Active',
    expiry: '2024-12-31',
    versions: 3,
    lastUpdated: '2024-01-15',
    uploader: 'John Doe',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    docName: 'Business License',
    docType: 'License',
    status: 'Active',
    expiry: '2024-06-30',
    versions: 2,
    lastUpdated: '2024-01-10',
    uploader: 'Jane Smith',
    fileSize: '1.8 MB'
  },
  {
    id: '3',
    docName: 'General Liability Insurance',
    docType: 'Insurance',
    status: 'Expired',
    expiry: '2023-12-15',
    versions: 1,
    lastUpdated: '2023-06-15',
    uploader: 'Bob Wilson',
    fileSize: '3.2 MB'
  },
  {
    id: '4',
    docName: 'Q4 2023 Audit Report',
    docType: 'Audit Report',
    status: 'Pending Review',
    expiry: '2025-03-31',
    versions: 1,
    lastUpdated: '2024-01-20',
    uploader: 'Alice Johnson',
    fileSize: '5.1 MB'
  },
];

export const mockVersions: Record<string, Version[]> = {
  '1': [
    { version: 3, date: '2024-01-15', uploader: 'John Doe', notes: 'Updated with new scope', fileSize: '2.4 MB' },
    { version: 2, date: '2023-07-20', uploader: 'Jane Smith', notes: 'Annual renewal', fileSize: '2.1 MB' },
    { version: 1, date: '2022-12-10', uploader: 'Bob Wilson', notes: 'Initial certification', fileSize: '1.9 MB' },
  ],
  '2': [
    { version: 2, date: '2024-01-10', uploader: 'Jane Smith', notes: 'Renewal with updated address', fileSize: '1.8 MB' },
    { version: 1, date: '2023-01-05', uploader: 'John Doe', notes: 'Initial license', fileSize: '1.5 MB' },
  ],
};

export const mockRequests: RequestItem[] = [
  {
    id: 'req1',
    docType: 'Certificate',
    dueDate: '2024-02-15',
    status: 'Pending',
    description: 'ISO 14001 Environmental Certificate'
  },
  {
    id: 'req2',
    docType: 'Insurance',
    dueDate: '2024-01-31',
    status: 'Overdue',
    description: 'Workers Compensation Insurance'
  },
  {
    id: 'req3',
    docType: 'Audit Report',
    dueDate: '2024-03-01',
    status: 'Fulfilled',
    description: 'Financial Audit Report 2023'
  },
];