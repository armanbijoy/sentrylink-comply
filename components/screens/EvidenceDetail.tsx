// components/screens/EvidenceDetail.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import StatusChip from '../ui/StatusChip';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { mockEvidence, mockVersions } from '../../lib/data';

export default function EvidenceDetail() {
  const params = useParams();
  const evidence = mockEvidence.find(e => e.id === params.id);
  const versions = mockVersions[params.id as string] || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVersion, setNewVersion] = useState({
    notes: '',
    expiryDate: '',
    file: null as File | null,
  });

  if (!evidence) {
    return <div>Evidence not found</div>;
  }

  const handleSubmit = () => {
    console.log('Uploading new version:', newVersion);
    // Here you can add actual upload logic or just use a fake file
    setIsModalOpen(false);
    setNewVersion({ notes: '', expiryDate: '', file: null });
  };

  return (
    <div className="space-y-8">
      {/* Evidence Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{evidence.docName}</h1>
            <div className="mt-2 flex items-center space-x-4">
              <span className="text-gray-600">{evidence.docType}</span>
              <StatusChip status={evidence.status} />
            </div>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Upload New Version
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-500">Expiry Date:</span>
            <span className="ml-2 text-gray-900">
              {new Date(evidence.expiry).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-500">Last Updated:</span>
            <span className="ml-2 text-gray-900">
              {new Date(evidence.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-500">Uploader:</span>
            <span className="ml-2 text-gray-900">{evidence.uploader}</span>
          </div>
          <div>
            <span className="font-medium text-gray-500">File Size:</span>
            <span className="ml-2 text-gray-900">{evidence.fileSize}</span>
          </div>
        </div>
      </div>

      {/* Version History */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Version History</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {versions.map((version) => (
            <div key={version.version} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-gray-900">Version {version.version}</span>
                  <p className="text-sm text-gray-500 mt-1">{version.notes}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-900">{new Date(version.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">{version.uploader}</div>
                  <div className="text-sm text-gray-500">{version.fileSize}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Uploading New Version */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload New Version"
      >
        <div className="space-y-4">
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes *</label>
            <textarea
              required
              value={newVersion.notes}
              onChange={(e) => setNewVersion({ ...newVersion, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
            <input
              type="date"
              value={newVersion.expiryDate}
              onChange={(e) => setNewVersion({ ...newVersion, expiryDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* File */}
          <div>
            <label className="block text-sm font-medium text-gray-700">File</label>
            <input
              type="file"
              onChange={(e) => setNewVersion({ ...newVersion, file: e.target.files?.[0] || null })}
              className="mt-1 block w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!newVersion.notes} // Notes are required
            >
              Upload Version
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
