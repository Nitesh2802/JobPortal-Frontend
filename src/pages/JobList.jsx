import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import JobCard from '../pages/JobCard.jsx';
import SearchFilters from '../pages/SearchFilters.jsx';
import api from '../services/api';
import '../style/JobList.css';

const JobList = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salaryMin: 0,
    salaryMax: 200000,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    fetchJobs(false);
  }, [filters, location]);

  const fetchJobs = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const response = await api.get('/jobs', {
        params: { ...filters, page: isLoadMore ? page : 1, limit: 10 },
      });

      const newJobs = response.data.data;

      if (isLoadMore) {
        setJobs(prev => [...prev, ...newJobs]);
      } else {
        setJobs(newJobs);
      }

      setHasMore(newJobs.length === 10);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  };

  const loadMoreJobs = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (page === 1) return;
    fetchJobs(true);
  }, [page]);

  const resetFilters = () => {
    const defaultFilters = {
      jobTitle: '',
      location: '',
      jobType: '',
      salaryMin: 0,
      salaryMax: 200000,
    };
    setFilters(defaultFilters);
  };

  return (
    <div className="job-list-page">
      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

      <div className="job-actions">
        <button onClick={() => fetchJobs(false)} className="refresh-btn">Refresh Jobs</button>
      </div>

      <div className="job-list-container">
        {loading && jobs.length === 0 ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            No jobs found matching your criteria
            <button onClick={resetFilters} className="reset-link">Reset filters and try again</button>
          </div>
        ) : (
          <>
            <div className="job-grid">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            {!loading && hasMore && (
              <div className="load-more-container">
                <button onClick={loadMoreJobs} className="load-more-btn">Load More</button>
              </div>
            )}
            {loading && <div className="loading">Loading more jobs...</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default JobList;
