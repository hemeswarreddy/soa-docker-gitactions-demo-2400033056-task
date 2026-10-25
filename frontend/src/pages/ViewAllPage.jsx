import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStorageUnits } from '../context/StorageUnitContext';

export const ViewAllPage = () => {
  const { units, loading, actionLoading, deleteUnit, fetchUnits } = useStorageUnits();
  const [unitToDelete, setUnitToDelete] = useState(null);

  const confirmDelete = async () => {
    if (unitToDelete) {
      await deleteUnit(unitToDelete.id);
      setUnitToDelete(null);
    }
  };

  return (
    <div className="card shadow-sm border">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold">All Storage Units</h5>
          <small className="text-muted font-monospace">Route: /viewall</small>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={fetchUnits}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <Link to="/add" className="btn btn-sm btn-primary">
            + Add Record (/add)
          </Link>
        </div>
      </div>

      <div className="card-body p-0">
        {loading && units.length === 0 ? (
          <div className="p-4 text-center text-muted">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
            Loading records from database...
          </div>
        ) : units.length === 0 ? (
          <div className="p-5 text-center text-muted">
            <p className="mb-2">No storage unit records found in the database.</p>
            <Link to="/add" className="btn btn-sm btn-primary">
              Add First Record
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-3">ID</th>
                  <th scope="col">Unit Code</th>
                  <th scope="col">Size (sq ft)</th>
                  <th scope="col">Monthly Fee ($)</th>
                  <th scope="col">Occupied</th>
                  <th scope="col" className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => (
                  <tr key={unit.id}>
                    <td className="ps-3 fw-bold">{unit.id}</td>
                    <td>{unit.unitCode}</td>
                    <td>{unit.sizeSquareFeet}</td>
                    <td>${Number(unit.monthlyFee).toFixed(2)}</td>
                    <td>
                      {unit.occupied ? (
                        <span className="badge bg-danger">Occupied</span>
                      ) : (
                        <span className="badge bg-success">Available</span>
                      )}
                    </td>
                    <td className="text-end pe-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => setUnitToDelete(unit)}
                        disabled={actionLoading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card-footer bg-white text-muted small py-2 d-flex justify-content-between">
        <span>Total Records: {units.length}</span>
      </div>

      {/* Delete Confirmation Modal */}
      {unitToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setUnitToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete Storage Unit <strong>{unitToDelete.unitCode}</strong> (ID: {unitToDelete.id})?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setUnitToDelete(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={confirmDelete}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllPage;
