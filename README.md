# 🛡️ CASEVAULT — Digital Evidence & Investigation Case Management System

> **Developed for Ministry of Home Affairs (MHA) & Smart India Hackathon (SIH)**  
> *Secure, Compliant, and Cryptographically Verified Digital Evidence Repository with Immutable Chain of Custody Tracking.*

[![Live Deployment (Render)](https://img.shields.io/badge/Render-Live%20App-000000?style=for-the-badge&logo=render)](https://civic-vaults.onrender.com)
[![Live Deployment (Vercel)](https://img.shields.io/badge/Vercel-Live%20App-000000?style=for-the-badge&logo=vercel)](https://civic-vaults-git-main-pds39937-1995s-projects.vercel.app/)
[![Database Engine](https://img.shields.io/badge/Supabase-Live%20PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://dnxkbeadfnjeelujynar.supabase.co)
[![Compliance](https://img.shields.io/badge/BSA%202023-Sec%2065B%20Compliant-6366F1?style=for-the-badge)]()

---

## 📌 Executive Summary

**CaseVault** is an enterprise-grade legal case docket and digital evidence management system designed for law enforcement agencies, cyber crime investigation cells, and forensic labs operating under the **Ministry of Home Affairs**.

It guarantees strict statutory compliance under the **Bharatiya Sakshya Adhiniyam 2023 (Section 65B Indian Evidence Act)** by maintaining an immutable, cryptographically sealed ledger for every piece of digital evidence.

---

## 🔥 Key USPs & Core Capabilities

### 1. 🥇 Immutable Chain of Custody Timeline
Every document view, edit, upload, or permission change records a cryptographically signed event in an immutable ledger containing:
- Officer Identity & Badge Number
- Precise Timestamp (IST)
- Event Verification ID (`COC-XXXXX`)
- Verification Status & Result

### 2. ⚡ Real-Time Web Crypto SHA-256 Hashing Engine
Processes raw file byte streams (`window.crypto.subtle.digest('SHA-256', arrayBuffer)`) directly in the browser upon drag & drop to generate authentic cryptographic checksums for tamper detection.

### 3. 📜 Section 65B Bharatiya Sakshya Adhiniyam 2023 Certificate Export
Generates downloadable, court-admissible electronic evidence certificates with statutory compliance declarations, QR code verification, and officer attestation.

### 4. 🕸️ Interactive Relationship Network Graph
SVG-based visual canvas mapping complex investigation webs between **Cases ↔ Assigned Officers ↔ Evidence Files ↔ Suspects ↔ Forensic Reports**.

### 5. 🔐 CERT-In / MHA MFA Security Passcode Challenge
Multi-factor 6-digit OTP verification challenge triggered prior to accessing Top-Secret dockets or executing legal releases.

### 6. 🛡️ Security Incident Monitoring & Incident Response Workflow
Real-time security threat detection center monitoring unauthorized access attempts, IP blocks, and automated incident remediation.

### 7. 🏷️ Dynamic Security Watermark Generator
Applies real-time rotational security watermarks over document previews displaying officer identity, timestamp, and confidentiality classification.

### 8. 📶 Offline Field Mode & Queue Synchronizer
Enables field officers in remote areas to record evidence intake locally; automatically syncs with Supabase database when connectivity is restored.

### 9. ⌘K Instant Command Search Modal
Multi-category global search indexed across active cases, evidence dockets, officers, and IP security logs.

### 10. 📊 Granular RBAC Permissions Matrix
Configurable Role-Based Access Control matrix establishing strict boundaries for Lead Inspectors, Forensic Analysts, and Security Administrators.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite 6 + Vanilla CSS Design System
- **Icons**: Lucide React Icons
- **Database Engine**: Supabase PostgreSQL Database (`cases`, `documents`, `audit_logs`)
- **Realtime**: Supabase Realtime WebSocket Channels (`public:cases`)
- **Cryptography**: Native Web Crypto API (SHA-256 digest)
- **Deployment**: Vercel & Render Multi-Cloud CI/CD

---

## 🚀 Local Development Setup

```bash
# 1. Clone Repository
git clone https://github.com/itzdevilsunny/civic-vaults.git
cd "Civic Vaults"

# 2. Install Dependencies
npm install

# 3. Start Development Server
npm run dev

# 4. Build Production Bundle
npm run build
```

---

## 📜 Database Schema DDL (`supabase/schema.sql`)

The database table structures and RLS policies are available under [`supabase/schema.sql`](./supabase/schema.sql).

---

## ⚖️ Statutory Compliance

Compliant with CERT-In Cybersecurity Guidelines and Section 65B of Bharatiya Sakshya Adhiniyam 2023 (formerly Indian Evidence Act, 1872).