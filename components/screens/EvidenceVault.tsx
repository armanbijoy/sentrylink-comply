// components/screens/EvidenceVault.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Table from '../ui/Table';
import StatusChip from '../ui/StatusChip';
import Button from '../ui/Button';
import { mockEvidence } from '../../lib/data';
import { Evidence } from '../../lib/types';

const columns = [
  { key: 'docName', label: 'Doc Name' },
  { key: 'docType', label: 'Doc Type' },
  { key: 'status', label: 'Status' },
  { key: 'expiry', label: 'Expiry' },
  { key: 'versions', label: 'Versions' },
  { key: 'lastUpdated', label: 'Last Updated' },
  { key: 'actions', label: 'Actions' },
];

export default function EvidenceVault() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    docType: searchParams.get('docType') || '',
    status: searchParams.get('status') || '',
    expiry: searchParams.get('expiry') || 'all',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  }, [filters, router]);

  const filteredEvidence = mockEvidence.filter((item) => {
    if (filters.docType && item.docType !== filters.docType) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.search && !item.docName.toLowerCase().includes(filters.search.toLowerCase())) return false;
    
    const today = new Date();
    const expiryDate = new Date(item.expiry);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (filters.expiry === 'expired' && daysUntilExpiry >= 0) return false;
    if (filters.expiry === 'expiring' && daysUntilExpiry > 30) return false;
    
    return true;
  });

  const handleSelectAll = () => {
    if (selectedItems.length === filteredEvidence.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredEvidence.map(item => item.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const renderRow = (item: Evidence) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.docName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.docType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusChip status={item.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.expiry).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.versions}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(item.lastUpdated).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => router.push(`/evidence/${item.id}`)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          View
        </button>
      </td>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Evidence Vault</h1>
        <div className="flex items-center space-x-4">
          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {selectedItems.length} selected
              </span>
              <Button variant="primary">Add to Pack</Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.docType}
          onChange={(e) => setFilters({ ...filters, docType: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Doc Types</option>
          {['Certificate', 'License', 'Insurance', 'Audit Report', 'Compliance'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          {['Active', 'Expired', 'Pending Review', 'Rejected'].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={filters.expiry}
          onChange={(e) => setFilters({ ...filters, expiry: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Expiry</option>
          <option value="expired">Expired</option>
          <option value="expiring">Expiring Soon (30 days)</option>
        </select>

        <input
          type="text"
          placeholder="Search documents..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <Table
        columns={columns}
        data={filteredEvidence}
        renderRow={renderRow}
        selectable
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}