import React, { useState, useEffect } from 'react';
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import MobileNav from './components/Navigation/MobileNav';
import Toast from './components/Common/Toast';
import SearchModal from './components/Modals/SearchModal';
import UploadModal from './components/Modals/UploadModal';
import DocumentViewerModal from './components/Modals/DocumentViewerModal';
import CreateCaseModal from './components/Modals/CreateCaseModal';
import ShareDocumentModal from './components/Modals/ShareDocumentModal';
import IncidentResponseModal from './components/Modals/IncidentResponseModal';

import DashboardView from './components/Dashboard/DashboardView';
import CasesListView from './components/Cases/CasesListView';
import CaseDetailsView from './components/Cases/CaseDetailsView';
import DocumentsListView from './components/Documents/DocumentsListView';
import AccessControlView from './components/Security/AccessControlView';
import AuditTrailView from './components/Security/AuditTrailView';
import SecurityLogsView from './components/Security/SecurityLogsView';
import ReportsView from './components/Reports/ReportsView';

import { 
  INITIAL_USER, 
  KPI_DATA, 
  CASES_OVERVIEW_DATA, 
  DOCUMENTS_BY_TYPE, 
  MOCK_CASES, 
  MOCK_DOCUMENTS, 
  MOCK_ACTIVITIES 
} from './data/mockData';

export default function App() {
  // Theme state: DEFAULT THEME IS LIGHT THEME
  const [theme, setTheme] = useState('light');
  
  // Navigation & Layout states
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Data states
  const [user] = useState(INITIAL_USER);
  const [cases, setCases] = useState(MOCK_CASES);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [unreadNotifications, setUnreadNotifications] = useState(7);

  // Selected item states
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Modals visibility states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateCaseOpen, setIsCreateCaseOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Sync theme attribute with document documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme`, 'info');
  };

  const handleToggleOffline = () => {
    const nextOffline = !isOffline;
    setIsOffline(nextOffline);
    if (nextOffline) {
      showToast("Offline Field Mode enabled. Submissions queued locally.", "warning");
    } else {
      showToast("Online connection restored. 3 queued documents synced to vault ✓", "success");
    }
  };

  const handleCreateCase = (newCase) => {
    setCases([newCase, ...cases]);
    showToast(`Investigation Case #${newCase.id} created successfully ✓`, "success");
  };

  const handleUploadComplete = (newDocData) => {
    const newDoc = {
      id: `DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: newDocData.name,
      caseId: newDocData.caseId,
      caseTitle: cases.find(c => c.id === newDocData.caseId)?.title || "Investigation",
      type: newDocData.type,
      size: newDocData.size,
      pages: 8,
      uploadedBy: user.name,
      uploaderRole: user.role,
      uploadDate: "Just now",
      version: "v1.0",
      classification: newDocData.classification,
      sha256: newDocData.sha256,
      hashVerified: true,
      legalHold: newDocData.legalHold,
      chainOfCustody: [
        {
          timestamp: new Date().toLocaleString() + " IST",
          officer: user.name,
          badge: user.badgeNumber,
          action: "Secure Vault Ingestion & Checksum Lock",
          verificationId: `COC-${Math.floor(90000 + Math.random() * 9999)}`,
          status: "Verified",
          result: "Created v1.0"
        }
      ],
      versions: [
        { version: "v1.0", date: "Just now", uploader: user.name, notes: "Initial intake document." }
      ]
    };

    setDocuments([newDoc, ...documents]);
    
    // Add to activity stream
    const newAct = {
      id: `ACT-${Date.now()}`,
      type: "upload",
      title: "Document ingested to vault",
      detail: `${newDoc.name} in Case #${newDoc.caseId}`,
      user: user.name,
      timestamp: "Just now",
      icon: "Upload",
      badgeColor: "#6366f1"
    };
    setActivities([newAct, ...activities]);

    showToast(`File ${newDoc.name} encrypted & ingested to Vault ✓`, "success");
  };

  const renderCurrentView = () => {
    // If a case is selected, render Case Details View
    if (selectedCase) {
      return (
        <CaseDetailsView 
          caseData={selectedCase}
          onBack={() => setSelectedCase(null)}
          onSelectDocument={(doc) => setSelectedDocument(doc)}
          onShowToast={showToast}
        />
      );
    }

    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView 
            kpis={KPI_DATA}
            casesOverview={CASES_OVERVIEW_DATA}
            documentsByType={DOCUMENTS_BY_TYPE}
            recentCases={cases}
            activities={activities}
            onSelectCase={(c) => setSelectedCase(c)}
            onSelectDocument={(d) => setSelectedDocument(d)}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenCreateCase={() => setIsCreateCaseOpen(true)}
            onChangeView={(view) => setActiveView(view)}
            onShowToast={showToast}
            onOpenAlert={(alert) => setSelectedAlert(alert)}
          />
        );
      case 'cases':
        return (
          <CasesListView 
            cases={cases}
            onSelectCase={(c) => setSelectedCase(c)}
            onOpenCreateCase={() => setIsCreateCaseOpen(true)}
            onShowToast={showToast}
          />
        );
      case 'documents':
      case 'shared':
      case 'requests':
      case 'trash':
        return (
          <DocumentsListView 
            documents={documents}
            onSelectDocument={(d) => setSelectedDocument(d)}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenShare={(d) => { setSelectedDocument(d); setIsShareOpen(true); }}
            onShowToast={showToast}
          />
        );
      case 'access-control':
        return <AccessControlView onShowToast={showToast} />;
      case 'audit-trail':
        return <AuditTrailView onShowToast={showToast} />;
      case 'security-logs':
        return (
          <SecurityLogsView 
            onOpenAlert={(alert) => setSelectedAlert(alert)} 
            onShowToast={showToast} 
          />
        );
      case 'reports':
      case 'analytics':
        return <ReportsView onShowToast={showToast} />;
      default:
        return (
          <DashboardView 
            kpis={KPI_DATA}
            casesOverview={CASES_OVERVIEW_DATA}
            documentsByType={DOCUMENTS_BY_TYPE}
            recentCases={cases}
            activities={activities}
            onSelectCase={(c) => setSelectedCase(c)}
            onSelectDocument={(d) => setSelectedDocument(d)}
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenCreateCase={() => setIsCreateCaseOpen(true)}
            onChangeView={(view) => setActiveView(view)}
            onShowToast={showToast}
            onOpenAlert={(alert) => setSelectedAlert(alert)}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeView={activeView}
        onChangeView={(view) => {
          setSelectedCase(null);
          setActiveView(view);
        }}
        isCollapsed={isSidebarCollapsed}
        onOpenCreateCase={() => setIsCreateCaseOpen(true)}
        onOpenUploadModal={() => setIsUploadOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar 
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSearch={() => setIsSearchOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isOffline={isOffline}
          onToggleOffline={handleToggleOffline}
          user={user}
          unreadNotifications={unreadNotifications}
          onOpenNotifications={() => showToast("7 Unread security & case update notifications", "info")}
        />

        {/* Page Body View */}
        <main className="page-body">
          {renderCurrentView()}
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <MobileNav 
        activeView={activeView}
        onChangeView={(view) => {
          setSelectedCase(null);
          setActiveView(view);
        }}
      />

      {/* Global Modals */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCase={(c) => setSelectedCase(c)}
        onSelectDocument={(d) => setSelectedDocument(d)}
      />

      <UploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
        cases={cases}
      />

      <CreateCaseModal 
        isOpen={isCreateCaseOpen}
        onClose={() => setIsCreateCaseOpen(false)}
        onCreateCase={handleCreateCase}
      />

      <DocumentViewerModal 
        document={selectedDocument}
        isOpen={Boolean(selectedDocument) && !isShareOpen}
        onClose={() => setSelectedDocument(null)}
        onShowToast={showToast}
      />

      <ShareDocumentModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        document={selectedDocument}
        onShowToast={showToast}
      />

      <IncidentResponseModal 
        isOpen={Boolean(selectedAlert)}
        onClose={() => setSelectedAlert(null)}
        alert={selectedAlert}
        onShowToast={showToast}
      />

      {/* Global Toast Component */}
      <Toast 
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
