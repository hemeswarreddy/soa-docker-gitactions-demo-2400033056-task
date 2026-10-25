import React from 'react';
import { Link } from 'react-router-dom';
import { useStorageUnits } from '../context/StorageUnitContext';

export const HomePage = () => {
  const { units, loading } = useStorageUnits();

  return (
    <div className="py-4">
      {/* Welcome Hero Card */}
      <div className="card shadow-sm border mb-4 text-center p-4 bg-white">
        <h2 className="fw-bold mb-2">Storage Unit CRUD Service</h2>
        <p className="text-muted mb-3 mx-auto" style={{ maxWidth: '600px' }}>
          Single Page Application built for the <code>CrudServiceProject</code>.
          Perform complete Create, Read, and Delete operations with PostgreSQL and Spring Boot.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <span className="badge bg-primary px-3 py-2 fs-6">
            Total Records in Database: {loading ? '...' : units.length}
          </span>
        </div>
      </div>

      {/* CRUD Action Cards */}
      <div className="row g-4 justify-content-center">
        {/* Card 1: View All */}
        <div className="col-md-6 col-lg-5">
          <div className="card h-100 shadow-sm border p-3">
            <div className="card-body d-flex flex-column text-center">
              <div className="fs-1 text-primary mb-2">📋</div>
              <h4 className="fw-bold mb-2">View Records</h4>
              <p className="text-muted small mb-4 flex-grow-1">
                Browse all storage unit records in a table, inspect sizes and monthly rental rates, and delete records.
              </p>
              <Link to="/viewall" className="btn btn-outline-primary fw-semibold w-100">
                Go to /viewall &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Add Unit */}
        <div className="col-md-6 col-lg-5">
          <div className="card h-100 shadow-sm border p-3">
            <div className="card-body d-flex flex-column text-center">
              <div className="fs-1 text-success mb-2">➕</div>
              <h4 className="fw-bold mb-2">Add New Record</h4>
              <p className="text-muted small mb-4 flex-grow-1">
                Create a new storage unit with automated ID generation, format validations, and instant database persistence.
              </p>
              <Link to="/add" className="btn btn-primary fw-semibold w-100">
                Go to /add &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
