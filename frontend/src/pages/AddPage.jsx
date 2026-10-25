import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStorageUnits } from '../context/StorageUnitContext';

export const AddPage = () => {
  const { addUnit, actionLoading } = useStorageUnits();
  const navigate = useNavigate();

  // Controlled form inputs - Strictly NO ID field!
  const [formData, setFormData] = useState({
    unitCode: '',
    sizeSquareFeet: '',
    monthlyFee: '',
    occupied: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Form Validation
  const validate = () => {
    const errs = {};

    const code = formData.unitCode.trim();
    if (!code) {
      errs.unitCode = 'Unit Code is required.';
    } else if (code.length < 2 || code.length > 20) {
      errs.unitCode = 'Unit Code must be between 2 and 20 characters.';
    } else if (!/^[A-Za-z0-9_-]+$/.test(code)) {
      errs.unitCode = 'Unit Code can only contain letters, numbers, hyphens (-), and underscores (_).';
    }

    const size = parseFloat(formData.sizeSquareFeet);
    if (!formData.sizeSquareFeet || isNaN(size)) {
      errs.sizeSquareFeet = 'Size in square feet is required.';
    } else if (size <= 0) {
      errs.sizeSquareFeet = 'Size must be a positive number greater than 0 sq ft.';
    }

    const fee = parseFloat(formData.monthlyFee);
    if (!formData.monthlyFee || isNaN(fee)) {
      errs.monthlyFee = 'Monthly fee is required.';
    } else if (fee <= 0) {
      errs.monthlyFee = 'Monthly fee must be a positive amount greater than $0.00.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      unitCode: true,
      sizeSquareFeet: true,
      monthlyFee: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Submit payload without ID (backend database generates ID)
    const res = await addUnit(formData);
    if (res.success) {
      navigate('/viewall');
    }
  };

  return (
    <div className="card shadow-sm border mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold">Add Storage Unit</h5>
          <small className="text-muted font-monospace">Route: /add</small>
        </div>
        <Link to="/viewall" className="btn btn-sm btn-outline-secondary">
          &larr; Back to /viewall
        </Link>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit} noValidate>
          {/* Unit Code */}
          <div className="mb-3">
            <label htmlFor="unitCode" className="form-label fw-semibold">
              Unit Code <span className="text-danger">*</span>
            </label>
            <input
              id="unitCode"
              name="unitCode"
              type="text"
              className={`form-control ${
                touched.unitCode && errors.unitCode ? 'is-invalid' : ''
              }`}
              placeholder="e.g. U-101"
              value={formData.unitCode}
              onChange={handleChange}
              onBlur={() => handleBlur('unitCode')}
              required
            />
            {touched.unitCode && errors.unitCode && (
              <div className="invalid-feedback">{errors.unitCode}</div>
            )}
            <div className="form-text text-muted small">
              Unique identifier code for the unit. (No ID input needed, DB auto-generates numeric ID).
            </div>
          </div>

          {/* Size */}
          <div className="mb-3">
            <label htmlFor="sizeSquareFeet" className="form-label fw-semibold">
              Size (Square Feet) <span className="text-danger">*</span>
            </label>
            <input
              id="sizeSquareFeet"
              name="sizeSquareFeet"
              type="number"
              step="any"
              className={`form-control ${
                touched.sizeSquareFeet && errors.sizeSquareFeet ? 'is-invalid' : ''
              }`}
              placeholder="e.g. 150"
              value={formData.sizeSquareFeet}
              onChange={handleChange}
              onBlur={() => handleBlur('sizeSquareFeet')}
              required
            />
            {touched.sizeSquareFeet && errors.sizeSquareFeet && (
              <div className="invalid-feedback">{errors.sizeSquareFeet}</div>
            )}
          </div>

          {/* Monthly Fee */}
          <div className="mb-3">
            <label htmlFor="monthlyFee" className="form-label fw-semibold">
              Monthly Fee ($) <span className="text-danger">*</span>
            </label>
            <input
              id="monthlyFee"
              name="monthlyFee"
              type="number"
              step="any"
              className={`form-control ${
                touched.monthlyFee && errors.monthlyFee ? 'is-invalid' : ''
              }`}
              placeholder="e.g. 75.00"
              value={formData.monthlyFee}
              onChange={handleChange}
              onBlur={() => handleBlur('monthlyFee')}
              required
            />
            {touched.monthlyFee && errors.monthlyFee && (
              <div className="invalid-feedback">{errors.monthlyFee}</div>
            )}
          </div>

          {/* Occupied Status */}
          <div className="mb-4 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="occupied"
              name="occupied"
              checked={formData.occupied}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="occupied">
              Is Occupied?
            </label>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/viewall')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={actionLoading}
            >
              {actionLoading ? 'Saving...' : 'Add Storage Unit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
