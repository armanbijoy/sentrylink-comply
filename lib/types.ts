// lib/types.ts
export type DocType = 'Certificate' | 'License' | 'Insurance' | 'Audit Report' | 'Compliance';
export type DocStatus = 'Active' | 'Expired' | 'Pending Review' | 'Rejected';

export interface Evidence {
  id: string;
  docName: string;
  docType: DocType;
  status: DocStatus;
  expiry: string;
  versions: number;
  lastUpdated: string;
  uploader: string;
  fileSize: string;
  notes?: string;
}

export interface Version {
  version: number;
  date: string;
  uploader: string;
  notes: string;
  fileSize: string;
}

export interface RequestItem {
  id: string;
  docType: DocType;
  dueDate: string;
  status: 'Pending' | 'Fulfilled' | 'Overdue';
  description: string;
}