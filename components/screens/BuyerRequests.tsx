// components/screens/BuyerRequests.tsx
'use client';

import { useState } from 'react';
import Table from '../ui/Table';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { mockRequests, mockEvidence } from '../../lib/data';

const columns = [
  { key: 'docType', label: 'Document Type' },
  { key: 'description', label: 'Description' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
];

export default function BuyerRequests() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fulfilledItems, setFulfilledItems] = useState<string[]>(['req3']);
  const [selectedEvidence, setSelectedEvidence] = useState<string>('');

  const handleFulfill = (requestId: string) => {
    setSelectedRequest(requestId);
    setIsModalOpen(true);
  };

  const handleSubmitFulfillment = () => {
    if (selectedRequest) {
      setFulfilledItems([...fulfilledItems, selectedRequest]);
      setIsModalOpen(false);
      setSelectedRequest(null);
      setSelectedEvidence('');
    }
  };

  const renderRow = (request: typeof mockRequests[0]) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {request.docType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {request.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(request.dueDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          fulfilledItems.includes(request.id)
            ? 'bg-green-100 text-green-800'
            : request.status === 'Overdue'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {fulfilledItems.includes(request.id) ? 'Fulfilled' : request.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {!fulfilledItems.includes(request.id) && (
          <button
            onClick={() => handleFulfill(request.id)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Fulfill
          </button>
        )}
      </td>
    </>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Buyer Request To-Do</h1>
      
      <Table
        columns={columns}
        data={mockRequests}
        renderRow={renderRow}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Fulfill Request"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Choose existing evidence or create new
            </label>
            <div className="mt-2 space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="existing"
                  name="evidenceType"
                  value="existing"
                  checked={true}
                  onChange={() => {}}
                  className="mr-2"
                />
                <label htmlFor="existing" className="text-sm text-gray-700">
                  Choose from Evidence Vault
                </label>
              </div>
              <select
                value={selectedEvidence}
                onChange={(e) => setSelectedEvidence(e.target.value)}
                className="ml-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select evidence...</option>
                {mockEvidence.map(evidence => (
                  <option key={evidence.id} value={evidence.id}>
                    {evidence.docName}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center mt-4">
                <input
                  type="radio"
                  id="new"
                  name="evidenceType"
                  value="new"
                  className="mr-2"
                />
                <label htmlFor="new" className="text-sm text-gray-700">
                  Create New Evidence
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitFulfillment}
              disabled={!selectedEvidence}
            >
              Mark as Fulfilled
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}