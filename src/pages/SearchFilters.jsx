import React, { useState } from 'react';
import '../style/SearchFilters.css';

const SearchFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };
  
  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: parseInt(value, 10)
    });
  };

  // Add a refresh function to force re-fetch jobs
  const handleReset = () => {
    const resetFilters = {
      jobTitle: '',
      location: '',
      jobType: '',
      salaryMin: 0,
      salaryMax: 200000
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="search-filters">
      <form onSubmit={handleSubmit}>
        <div className="filter-container">
          <div className="search-input">
            <input
              type="text"
              name="jobTitle"
              placeholder="Search By Job Title, Role"
              value={localFilters.jobTitle}
              onChange={handleInputChange}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-dropdown">
            <select
              name="location"
              value={localFilters.location}
              onChange={handleInputChange}
            >
              <option value="">Preferred Location</option>
              <option value="Remote">Remote</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
          
          <div className="filter-dropdown">
            <select
              name="jobType"
              value={localFilters.jobType}
              onChange={handleInputChange}
            >
              <option value="">Job Type</option>
              <option value="FullTime">Full-time</option>
              <option value="PartTime">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          
          <div className="salary-filter">
            <div className="salary-label">
              Salary Per Month
              <span className="salary-values">
                ₹{localFilters.salaryMin.toLocaleString()} - ₹{localFilters.salaryMax.toLocaleString()}
              </span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                name="salaryMin"
                min="0"
                max="120000"
                step="5000"
                value={localFilters.salaryMin}
                onChange={handleSliderChange}
                onMouseUp={() => onFilterChange(localFilters)}
              />
              <input
                type="range"
                name="salaryMax"
                min="0"
                max="20000000"
                step="5000"
                value={localFilters.salaryMax}
                onChange={handleSliderChange}
                onMouseUp={() => onFilterChange(localFilters)}
              />
            </div>
          </div>
          
          <div className="filter-buttons">
            <button type="submit" className="search-btn">Search</button>
            <button type="button" className="reset-btn" onClick={handleReset}>Reset Filters</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;