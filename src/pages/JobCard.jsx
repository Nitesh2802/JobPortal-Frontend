import React from 'react';
import '../style/JobCard.css';

const JobCard = ({ job }) => {
  const getCompanyLogo = (companyName) => {
    const name = companyName.toLowerCase();

    if (name.includes('amazon')) {
      return 'https://res.cloudinary.com/ddkrvjiws/image/upload/v1745350778/jobPortal/xyvsfpsxynje27vq3xa2.png';
    } else if (name.includes('tesla')) {
      return 'https://res.cloudinary.com/ddkrvjiws/image/upload/v1745350455/jobPortal/nickmjx0prcbb6x7qvcf.jpg';
    } else if (name.includes('microsoft')) {
      return 'https://res.cloudinary.com/ddkrvjiws/image/upload/v1745350848/jobPortal/pxbpk2t594v3uzyu6eh1.png';
    } else if (name.includes('swiggy')) {
      return 'https://res.cloudinary.com/ddkrvjiws/image/upload/v1745350903/jobPortal/ehoibfgmfkgvivbtfron.jpg';
    } else {
      return 'https://res.cloudinary.com/ddkrvjiws/image/upload/v1745350982/jobPortal/iovesdnzragozefpmjxo.png';
    }
  };

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}d Ago`;
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-logo">
          <img src={getCompanyLogo(job.companyName)} alt={`${job.companyName} logo`} />
        </div>
        <div className="job-posted">
          <span>{getDaysAgo(job.createdAt)}</span>
        </div>
      </div>

      <h3 className="job-title">{job.jobTitle}</h3>

      <div className="job-details">
        <div className="job-detail">
          <span className="job-detail-icon">👤</span>
          <span>{job.experience || '1-3 yr Exp'}</span>
        </div>
        <div className="job-detail">
          <span className="job-detail-icon">📍</span>
          <span>{job.location || 'Onsite'}</span>
        </div>
        <div className="job-detail">
          <span className="job-detail-icon">💰</span>
          <span>{!job.salaryDisplay || job.salaryDisplay === '0LPA' ? '12LPA' : job.salaryDisplay}</span>
        </div>
      </div>

      <ul className="job-features">
        {job.description
          ? job.description.split('.').filter(Boolean).map((line, idx) => (
              <li key={idx}>
                <span>&#8226;</span> {line.trim()}
              </li>
            ))
          : (
              <>
                <li>
                  <span>&#8226;</span> A user-friendly interface lets you browse stunning photos and videos
                </li>
                <li>
                  <span>&#8226;</span> Filter destinations based on interests and travel style
                </li>
              </>
            )}
      </ul>

      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;
