// Real-world domain-specific mock data for CaseVault Investigation Platform

export const INITIAL_USER = {
  name: "Inspector Arjun Singh",
  role: "Senior Investigation Officer",
  badgeNumber: "IND-DL-8892",
  department: "Cyber Crime & Special Investigation Cell",
  unit: "Central Bureau of Narcotics & High Tech Crime",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  email: "arjun.singh@gov.in",
  mfaEnabled: true,
  lastLogin: "2026-08-22 18:42:10 IST",
  ipAddress: "10.42.108.15",
  activeSessionsCount: 24,
  clearanceLevel: "TOP SECRET / RESTRICTED"
};

export const KPI_DATA = {
  activeCases: { count: 42, trend: "+8", period: "from last month", positive: true },
  totalDocuments: { count: 1284, trend: "+156", period: "from last month", positive: true },
  pendingApprovals: { count: 17, trend: "-5", period: "from last month", positive: true },
  securityAlerts: { count: 4, trend: "-2", period: "requires review", positive: false, critical: true }
};

export const CASES_OVERVIEW_DATA = {
  underInvestigation: 18,
  pendingReview: 9,
  awaitingApproval: 7,
  closed: 8,
  total: 42
};

export const DOCUMENTS_BY_TYPE = [
  { type: "FIR / Complaints", count: 412, percentage: 32, icon: "FileText", color: "#6366f1" },
  { type: "Statements", count: 298, percentage: 23, icon: "UserCheck", color: "#3b82f6" },
  { type: "Evidence", count: 236, percentage: 18, icon: "ShieldCheck", color: "#10b981" },
  { type: "Reports", count: 186, percentage: 15, icon: "BarChart3", color: "#f59e0b" },
  { type: "Other Documents", count: 152, percentage: 12, icon: "FolderArchive", color: "#8b5cf6" }
];

export const MOCK_CASES = [
  {
    id: "2026-0789",
    title: "Cyber Fraud & Money Laundering Investigation",
    assignedTo: "Arjun Singh",
    assignedRole: "Lead Inspector",
    status: "Under Investigation",
    priority: "High",
    lastUpdated: "10 mins ago",
    dateCreated: "2026-08-01",
    documentCount: 24,
    evidenceCount: 14,
    leadOfficerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
    legalHold: true,
    summary: "Multi-jurisdictional cyber fraud investigation involving unauthorized access to banking infrastructure and illicit transaction routing through overseas digital wallets."
  },
  {
    id: "2026-0788",
    title: "Illegal Arms Possession & Trafficking Network",
    assignedTo: "Priya Sharma",
    assignedRole: "Senior Officer",
    status: "Pending Review",
    priority: "Critical",
    lastUpdated: "45 mins ago",
    dateCreated: "2026-07-28",
    documentCount: 18,
    evidenceCount: 9,
    leadOfficerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256",
    legalHold: true,
    summary: "Seizure of illicit firearms shipment at Logistics Hub B. Ballistics and serial hash analysis underway."
  },
  {
    id: "2026-0787",
    title: "Corporate Financial Scam & Tax Evasion",
    assignedTo: "Arjun Singh",
    assignedRole: "Lead Inspector",
    status: "Awaiting Approval",
    priority: "Medium",
    lastUpdated: "1 hour ago",
    dateCreated: "2026-07-15",
    documentCount: 42,
    evidenceCount: 31,
    leadOfficerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
    legalHold: false,
    summary: "Forensic audit of shell corporation ledgers and falsified invoices submitted to revenue authorities."
  },
  {
    id: "2026-0786",
    title: "High-Profile Homicide Case Investigation",
    assignedTo: "Vikram Patel",
    assignedRole: "Forensic Lead",
    status: "Under Investigation",
    priority: "Critical",
    lastUpdated: "2 hours ago",
    dateCreated: "2026-08-10",
    documentCount: 35,
    evidenceCount: 28,
    leadOfficerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
    legalHold: true,
    summary: "Crime scene forensic analysis, DNA sequencing match reports, and suspect timeline reconstruction."
  },
  {
    id: "2026-0785",
    title: "International Narcotics Cartel Syndicate",
    assignedTo: "Neha Verma",
    assignedRole: "Investigation Officer",
    status: "Under Investigation",
    priority: "High",
    lastUpdated: "3 hours ago",
    dateCreated: "2026-06-20",
    documentCount: 64,
    evidenceCount: 42,
    leadOfficerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256",
    legalHold: true,
    summary: "Interception of encrypted communication channels and narcotics seizure chain-of-custody logging."
  },
  {
    id: "2026-0784",
    title: "State Infrastructure Data Breach",
    assignedTo: "Arjun Singh",
    assignedRole: "Lead Inspector",
    status: "Closed",
    priority: "High",
    lastUpdated: "Yesterday",
    dateCreated: "2026-05-12",
    documentCount: 51,
    evidenceCount: 19,
    leadOfficerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
    legalHold: false,
    summary: "Resolved data breach incident. Malware payload isolated and patch signatures deployed."
  }
];

export const MOCK_DOCUMENTS = [
  {
    id: "DOC-2026-001",
    name: "FIR_2026_0789_CyberCrime.pdf",
    caseId: "2026-0789",
    caseTitle: "Cyber Fraud Investigation",
    type: "FIR / Complaints",
    size: "4.2 MB",
    pages: 12,
    uploadedBy: "Inspector Arjun Singh",
    uploaderRole: "Lead Investigator",
    uploadDate: "2026-08-22 10:15 IST",
    version: "v2.0",
    classification: "Highly Restricted",
    sha256: "8f4c2b9a1c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f",
    hashVerified: true,
    digitalSignature: {
      signedBy: "Senior Investigation Officer S. Roy",
      date: "2026-08-22 11:30 IST",
      signatureHash: "SIG-99812-EC-2026",
      verified: true
    },
    legalHold: true,
    accessCount: 48,
    chainOfCustody: [
      {
        timestamp: "2026-08-22 11:30 IST",
        officer: "Senior Officer S. Roy",
        badge: "IND-DL-1002",
        action: "Digital Signature Applied & Approval Granted",
        verificationId: "COC-99104",
        status: "Verified",
        result: "Success"
      },
      {
        timestamp: "2026-08-22 10:45 IST",
        officer: "Forensic Analyst R. Mehta",
        badge: "IND-DL-4412",
        action: "SHA-256 File Hash Integrity Re-computed & Verified",
        verificationId: "COC-99088",
        status: "Verified",
        result: "Integrity Verified"
      },
      {
        timestamp: "2026-08-22 10:15 IST",
        officer: "Inspector Arjun Singh",
        badge: "IND-DL-8892",
        action: "Initial Secure Upload & Encrypted Vault Ingestion",
        verificationId: "COC-99001",
        status: "Verified",
        result: "Created v1.0"
      }
    ],
    versions: [
      { version: "v2.0", date: "2026-08-22 10:45 IST", uploader: "Forensic Analyst R. Mehta", notes: "Added forensic checksum appendix and IP routing logs." },
      { version: "v1.1", date: "2026-08-21 16:20 IST", uploader: "Inspector Arjun Singh", notes: "Redacted witness PII credentials." },
      { version: "v1.0", date: "2026-08-20 09:15 IST", uploader: "Inspector Arjun Singh", notes: "Original initial complaint intake report." }
    ]
  },
  {
    id: "DOC-2026-002",
    name: "Evidence_Image_ServerRack_01.jpg",
    caseId: "2026-0789",
    caseTitle: "Cyber Fraud Investigation",
    type: "Evidence",
    size: "18.5 MB",
    pages: 1,
    uploadedBy: "Forensic Analyst R. Mehta",
    uploaderRole: "Digital Forensics Expert",
    uploadDate: "2026-08-21 14:30 IST",
    version: "v1.0",
    classification: "Restricted",
    sha256: "3a9f7e1b4c6d8a2e5f0b9c7d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f",
    hashVerified: true,
    digitalSignature: {
      signedBy: "Forensic Analyst R. Mehta",
      date: "2026-08-21 14:35 IST",
      signatureHash: "SIG-88712-FA-2026",
      verified: true
    },
    legalHold: true,
    accessCount: 19,
    chainOfCustody: [
      {
        timestamp: "2026-08-21 14:30 IST",
        officer: "Forensic Analyst R. Mehta",
        badge: "IND-DL-4412",
        action: "Hardware Seizure Photographic Evidence Upload",
        verificationId: "COC-98512",
        status: "Verified",
        result: "Success"
      }
    ],
    versions: [
      { version: "v1.0", date: "2026-08-21 14:30 IST", uploader: "Forensic Analyst R. Mehta", notes: "High resolution digital capture at raid location." }
    ]
  },
  {
    id: "DOC-2026-003",
    name: "Witness_Statement_SuspectA.pdf",
    caseId: "2026-0788",
    caseTitle: "Illegal Arms Trafficking",
    type: "Statements",
    size: "2.8 MB",
    pages: 8,
    uploadedBy: "Officer Priya Sharma",
    uploaderRole: "Senior Officer",
    uploadDate: "2026-08-22 09:20 IST",
    version: "v1.1",
    classification: "Confidential",
    sha256: "7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c",
    hashVerified: true,
    digitalSignature: {
      signedBy: "Officer Priya Sharma",
      date: "2026-08-22 09:25 IST",
      signatureHash: "SIG-77119-PS-2026",
      verified: true
    },
    legalHold: true,
    accessCount: 12,
    chainOfCustody: [
      {
        timestamp: "2026-08-22 09:20 IST",
        officer: "Officer Priya Sharma",
        badge: "IND-DL-3341",
        action: "Deposition Transcript Intake & Hash Lock",
        verificationId: "COC-98920",
        status: "Verified",
        result: "Success"
      }
    ],
    versions: [
      { version: "v1.1", date: "2026-08-22 09:20 IST", uploader: "Officer Priya Sharma", notes: "Added audio transcript cross-references." }
    ]
  },
  {
    id: "DOC-2026-004",
    name: "Forensic_Ballistics_Analysis_Report.pdf",
    caseId: "2026-0788",
    caseTitle: "Illegal Arms Trafficking",
    type: "Reports",
    size: "6.4 MB",
    pages: 24,
    uploadedBy: "Vikram Patel",
    uploaderRole: "Forensic Lead",
    uploadDate: "2026-08-20 16:45 IST",
    version: "v1.0",
    classification: "Highly Restricted",
    sha256: "1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f",
    hashVerified: true,
    digitalSignature: {
      signedBy: "Vikram Patel (Forensic Lead)",
      date: "2026-08-20 17:00 IST",
      signatureHash: "SIG-55421-VP-2026",
      verified: true
    },
    legalHold: true,
    accessCount: 31,
    chainOfCustody: [
      {
        timestamp: "2026-08-20 16:45 IST",
        officer: "Vikram Patel",
        badge: "IND-DL-7721",
        action: "Ballistics Fingerprinting Report Submission",
        verificationId: "COC-97421",
        status: "Verified",
        result: "Success"
      }
    ],
    versions: [
      { version: "v1.0", date: "2026-08-20 16:45 IST", uploader: "Vikram Patel", notes: "Final signed forensic report." }
    ]
  }
];

export const MOCK_ACTIVITIES = [
  {
    id: "ACT-001",
    type: "upload",
    title: "Document uploaded",
    detail: "FIR_2026_0789_CyberCrime.pdf in Case #2026-0789",
    user: "Inspector Arjun Singh",
    timestamp: "10 mins ago",
    icon: "Upload",
    badgeColor: "#6366f1"
  },
  {
    id: "ACT-002",
    type: "view",
    title: "Document viewed",
    detail: "Evidence_Image_ServerRack_01.jpg in Case #2026-0789",
    user: "Forensic Analyst R. Mehta",
    timestamp: "25 mins ago",
    icon: "Eye",
    badgeColor: "#3b82f6"
  },
  {
    id: "ACT-003",
    type: "permission",
    title: "Access permission elevated",
    detail: "Granted Restricted Read to Inspector P. Sharma for Case #2026-0787",
    user: "Inspector Arjun Singh",
    timestamp: "1 hour ago",
    icon: "Lock",
    badgeColor: "#8b5cf6"
  },
  {
    id: "ACT-004",
    type: "share",
    title: "Document shared securely",
    detail: "Forensic_Ballistics_Analysis_Report.pdf shared with Legal Counsel",
    user: "Officer Priya Sharma",
    timestamp: "2 hours ago",
    icon: "Share2",
    badgeColor: "#10b981"
  },
  {
    id: "ACT-005",
    type: "approval",
    title: "Document approved & signed",
    detail: "Witness_Statement_SuspectA.pdf digitally signed",
    user: "Senior Officer S. Roy",
    timestamp: "3 hours ago",
    icon: "CheckCircle2",
    badgeColor: "#059669"
  },
  {
    id: "ACT-006",
    type: "security",
    title: "Security event logged",
    detail: "Unrecognized IP login attempt blocked (IP: 192.168.1.45)",
    user: "System Vault Guard",
    timestamp: "4 hours ago",
    icon: "AlertTriangle",
    badgeColor: "#ef4444"
  }
];

export const MOCK_SECURITY_LOGS = [
  {
    id: "SEC-9001",
    timestamp: "2026-08-22 18:30 IST",
    event: "Unauthorized Document Access Attempt",
    severity: "HIGH",
    user: "Unknown User (Session #8812)",
    ipAddress: "192.168.1.45",
    device: "Chrome on Windows 10 (Delhi)",
    action: "Blocked by Vault Guardian",
    target: "Vault/Financial_Ledger_Q3.pdf",
    details: "Failed clearance level check for Highly Restricted file."
  },
  {
    id: "SEC-9002",
    timestamp: "2026-08-22 17:15 IST",
    event: "Multiple Failed Login Attempts",
    severity: "CRITICAL",
    user: "officer.k@gov.in",
    ipAddress: "49.207.194.12",
    device: "Firefox on macOS (Mumbai)",
    action: "Account Lockout & MFA Forced",
    target: "Auth Endpoint /api/login",
    details: "5 consecutive invalid password submissions within 60s."
  },
  {
    id: "SEC-9003",
    timestamp: "2026-08-22 15:40 IST",
    event: "SHA-256 Hash Verification Re-Check",
    severity: "LOW",
    user: "Inspector Arjun Singh",
    ipAddress: "10.42.108.15",
    device: "CaseVault Workstation (Delhi Cell)",
    action: "Passed (100% Match)",
    target: "FIR_2026_0789_CyberCrime.pdf",
    details: "Automated cron check confirmed file integrity unaltered."
  },
  {
    id: "SEC-9004",
    timestamp: "2026-08-22 12:10 IST",
    event: "Legal Hold Enforcement Enabled",
    severity: "MEDIUM",
    user: "Senior Officer S. Roy",
    ipAddress: "10.42.100.8",
    device: "Secure Terminal #04",
    action: "Legal Hold Applied",
    target: "Case #2026-0789 & All Sub-files",
    details: "Permanent retention policy enforced. Deletion locked."
  }
];

export const MOCK_EVIDENCE_GRAPH = {
  caseId: "2026-0789",
  nodes: [
    { id: "case", label: "Case #2026-0789", sub: "Cyber Fraud", type: "case", color: "#6366f1" },
    { id: "officer1", label: "Insp. Arjun Singh", sub: "Lead Investigator", type: "person", color: "#3b82f6" },
    { id: "officer2", label: "Analyst R. Mehta", sub: "Digital Forensics", type: "person", color: "#3b82f6" },
    { id: "suspect1", label: "Karan Oberoi", sub: "Primary Suspect", type: "suspect", color: "#ef4444" },
    { id: "evidence1", label: "Server Rack Capture", sub: "Hardware Evidence", type: "evidence", color: "#10b981" },
    { id: "evidence2", label: "SWIFT Ledger PDF", sub: "Financial Document", type: "evidence", color: "#10b981" },
    { id: "report1", label: "IP Packet Dump", sub: "Forensic Analysis", type: "report", color: "#f59e0b" }
  ],
  links: [
    { source: "case", target: "officer1", label: "Assigned Lead" },
    { source: "case", target: "officer2", label: "Assigned Forensics" },
    { source: "case", target: "suspect1", label: "Under Warrant" },
    { source: "officer1", target: "evidence2", label: "Uploaded" },
    { source: "officer2", target: "evidence1", label: "Seized" },
    { source: "officer2", target: "report1", label: "Generated" },
    { source: "suspect1", target: "evidence1", label: "Associated MAC" },
    { source: "evidence2", target: "suspect1", label: "Beneficiary ID" }
  ]
};

export const MOCK_RBAC_ROLES = [
  {
    role: "Admin / System Chief",
    usersCount: 3,
    description: "Full system administration, user provisioning, security log audit, legal hold release.",
    permissions: { view: true, upload: true, edit: true, download: true, share: true, delete: true, approve: true, assign: true }
  },
  {
    role: "Senior Officer",
    usersCount: 12,
    description: "Case management oversight, legal approvals, digital signature enforcement, officer assignment.",
    permissions: { view: true, upload: true, edit: true, download: true, share: true, delete: false, approve: true, assign: true }
  },
  {
    role: "Investigation Officer",
    usersCount: 45,
    description: "Primary investigator role for uploading FIRs, managing assigned cases, and generating reports.",
    permissions: { view: true, upload: true, edit: true, download: true, share: true, delete: false, approve: false, assign: false }
  },
  {
    role: "Forensic Officer",
    usersCount: 18,
    description: "Specialized role for digital evidence ingestion, SHA-256 hash logging, and technical reports.",
    permissions: { view: true, upload: true, edit: true, download: true, share: false, delete: false, approve: false, assign: false }
  },
  {
    role: "Legal Counsel / Reviewer",
    usersCount: 8,
    description: "Read-only access for case evaluation, court presentation export, and compliance auditing.",
    permissions: { view: true, upload: false, edit: false, download: true, share: false, delete: false, approve: false, assign: false }
  }
];
