import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Job Portal Logo" />
              {/* <h2>JobPortal</h2> */}
            </Link>
          </div>

          {/* Desktop links */}
          <div className="nav-links desktop-only">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/" className="nav-link">Find Jobs</Link>
            <Link to="/" className="nav-link">Find Talents</Link>
            <Link to="/" className="nav-link">About us</Link>
            <Link to="/" className="nav-link">Testimonials</Link>
          </div>

          <div className="action-button desktop-only">
            <Link to="/create-job" className="create-job-btn">Create Jobs</Link>
          </div>

          {/* Hamburger icon */}
          <div className="hamburger mobile-only" onClick={toggleSidebar}>
            ☰
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>✕</button>
        <Link to="/" className="nav-link" onClick={closeSidebar}>Home</Link>
        <Link to="/" className="nav-link" onClick={closeSidebar}>Find Jobs</Link>
        <Link to="/" className="nav-link" onClick={closeSidebar}>Find Talents</Link>
        <Link to="/" className="nav-link" onClick={closeSidebar}>About us</Link>
        <Link to="/" className="nav-link" onClick={closeSidebar}>Testimonials</Link>
        <Link to="/create-job" className="create-job-btn" onClick={closeSidebar}>Create Jobs</Link>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Navbar;
