import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Storage Unit CRUD
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#simpleNavbar"
          aria-controls="simpleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Independent URL Navigation Links */}
        <div className="collapse navbar-collapse" id="simpleNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`
                }
              >
                Home (/)
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/viewall"
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`
                }
              >
                View Records (/viewall)
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`
                }
              >
                + Add Record (/add)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
