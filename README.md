Evidence Vault + Request Fulfillment UI (Phase A)
Overview

This project is a small React/Next.js application demonstrating SentryLink Comply Phase A for a Factory user.
It includes 3 main screens with mock data and local state management:

Evidence Vault – Displays a table of documents with filters, search, and bulk actions.

Evidence Detail + Versions – Shows document metadata and version history; allows uploading new versions.

Buyer Request To-Do – Displays request items with a “Fulfill” action to select evidence or create new mock evidence.

Reusable components:

Button

Modal

StatusChip

Table

Features
Evidence Vault (List)

Table columns: Doc Name | Doc Type | Status | Expiry | Versions | Last Updated | Actions

Filters: Doc Type, Status, Expiry (expired / expiring soon / all)

Search functionality

Bulk select + “Add to Pack” button (displays selected count)

Filters optionally persist in URL query string

Evidence Detail + Versions

Shows metadata and status chip

Version list: date, uploader, notes, file size

“Upload New Version” button opens a modal:

Notes (required)

Expiry date (optional)

File input (mock)

Buyer Request To-Do

List of request items: docType, due date, status

“Fulfill” action opens modal:

Choose existing evidence from vault OR create new evidence (mock)

Mark item as fulfilled

Getting Started
Prerequisites

Node.js >= 18.x

npm or yarn

Installation
# Clone repo
git clone <your-repo-url>
cd <repo-folder>

# Install dependencies
npm install
# or
yarn install

Running the App
# Start development server
npm run dev
# or
yarn dev


Open http://localhost:3000
 to view in your browser.

Building for Production
npm run build
npm run start

Usage

Navigate between screens: Evidence Vault → Evidence Detail → Buyer Requests

Use filters, search, and bulk actions in Evidence Vault

Open modals to upload new versions or fulfill requests

All data is mocked and stored in local state; no backend required
