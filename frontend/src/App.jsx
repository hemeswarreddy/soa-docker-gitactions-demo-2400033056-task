import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StorageUnitProvider, useStorageUnits } from './context/StorageUnitContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ViewAllPage } from './pages/ViewAllPage';
import { AddPage } from './pages/AddPage';

const AppContent = () => {
  const { error, success, clearMessages } = useStorageUnits();

  return (
    <div className="bg-light min-vh-100">
      {/* Clean Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="container pb-5">
        {/* Success Feedback Alert */}
        {success && (
          <div
            className="alert alert-success alert-dismissible fade show d-flex align-items-center shadow-sm"
            role="alert"
          >
            <i className="bi bi-check-circle-fill fs-5 text-success me-2"></i>
            <div>
              <strong>Success:</strong> {success}
            </div>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={clearMessages}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Error Feedback Alert */}
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show d-flex align-items-center shadow-sm"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill fs-5 text-danger me-2"></i>
            <div>
              <strong>Error:</strong> {error}
            </div>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={clearMessages}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Independent URL Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/viewall" element={<ViewAllPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <StorageUnitProvider>
        <AppContent />
      </StorageUnitProvider>
    </BrowserRouter>
  );
};

export default App;
