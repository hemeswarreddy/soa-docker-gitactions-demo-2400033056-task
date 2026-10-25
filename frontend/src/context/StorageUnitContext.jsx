import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageUnitApi } from '../api/storageUnitApi';

const StorageUnitContext = createContext(null);

export const StorageUnitProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Auto dismiss success messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  /**
   * Fetch all records using Fetch API
   */
  const fetchUnits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await storageUnitApi.getAll();
      setUnits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error loading records from server.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add record using Axios
   * NOTE: ID is omitted, backend generates it
   */
  const addUnit = async (formData) => {
    setActionLoading(true);
    setError(null);
    try {
      const payload = {
        unitCode: String(formData.unitCode).trim(),
        sizeSquareFeet: parseFloat(formData.sizeSquareFeet),
        monthlyFee: parseFloat(formData.monthlyFee),
        occupied: Boolean(formData.occupied),
      };

      const newUnit = await storageUnitApi.add(payload);
      setUnits((prev) => [...prev, newUnit]);
      setSuccess(`Record created successfully with ID: ${newUnit.id}`);
      return { success: true, unit: newUnit };
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add record.');
      return { success: false };
    } finally {
      setActionLoading(false);
    }
  };

  /**
   * Delete record using Axios
   */
  const deleteUnit = async (id) => {
    setActionLoading(true);
    setError(null);
    try {
      const msg = await storageUnitApi.delete(id);
      setUnits((prev) => prev.filter((u) => u.id !== id));
      setSuccess(typeof msg === 'string' ? msg : `Record #${id} deleted successfully.`);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || err.message || `Failed to delete record #${id}.`);
      return { success: false };
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  return (
    <StorageUnitContext.Provider
      value={{
        units,
        loading,
        actionLoading,
        error,
        success,
        fetchUnits,
        addUnit,
        deleteUnit,
        clearMessages,
      }}
    >
      {children}
    </StorageUnitContext.Provider>
  );
};

export const useStorageUnits = () => {
  const context = useContext(StorageUnitContext);
  if (!context) {
    throw new Error('useStorageUnits must be used within StorageUnitProvider');
  }
  return context;
};

export default StorageUnitContext;
