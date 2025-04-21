import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import DashboardPage from './pages/DashboardPage';
import PrintQueuePage from './pages/PrintQueuePage';
import ClientsPage from './pages/ClientsPage';
import DeliveryPage from './pages/DeliveryPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/queue" element={<PrintQueuePage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;