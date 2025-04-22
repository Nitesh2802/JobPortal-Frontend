import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../style/CreateJob.css';

const CreateJob = () => {
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        jobTitle: '',
        companyName: '',
        location: '',
        jobType: 'FullTime',
        salaryMin: '',
        salaryMax: '',
        applicationDeadline: '',
        jobDescription: '',
        requirements: '',
        responsibilities: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!jobData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
        if (!jobData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!jobData.location.trim()) newErrors.location = 'Location is required';
        if (!jobData.jobType) newErrors.jobType = 'Job type is required';
        if (!jobData.salaryMin) newErrors.salaryMin = 'Minimum salary is required';
        if (!jobData.salaryMax) newErrors.salaryMax = 'Maximum salary is required';
        if (Number(jobData.salaryMin) > Number(jobData.salaryMax)) {
            newErrors.salaryMin = 'Minimum salary cannot be greater than maximum salary';
        }
        if (!jobData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            setLoading(true);
            await api.post('/jobs', jobData);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Error creating job:', error);
            setLoading(false);
            setErrors({
                submit: error.response?.data?.message || 'Failed to create job. Please try again.'
            });
        }
    };

    const handleSaveDraft = async () => {
        try {
            setLoading(true);
            await api.post('/jobs/drafts', jobData);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Error saving draft:', error);
            setLoading(false);
            setErrors({
                submit: error.response?.data?.message || 'Failed to save draft. Please try again.'
            });
        }
    };

    return (
        <div className="create-job-page">
            <div className="create-job-modal">
                <h2>Create Job Opening</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={jobData.jobTitle}
                                onChange={handleChange}
                                className={errors.jobTitle ? 'input-error' : ''}
                                placeholder="Full Stack Developer"
                            />
                            {errors.jobTitle && <div className="error-message">{errors.jobTitle}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={jobData.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? 'input-error' : ''}
                                placeholder="Amazon, Microsoft, Swiggy"
                            />
                            {errors.companyName && <div className="error-message">{errors.companyName}</div>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <select
                                id="location"
                                name="location"
                                value={jobData.location}
                                onChange={handleChange}
                                className={errors.location ? 'input-error' : ''}
                            >
                                <option value="">Choose Preferred Location</option>
                                <option value="Remote">Remote</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Pune">Pune</option>
                            </select>
                            {errors.location && <div className="error-message">{errors.location}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="jobType">Job Type</label>
                            <select
                                id="jobType"
                                name="jobType"
                                value={jobData.jobType}
                                onChange={handleChange}
                                className={errors.jobType ? 'input-error' : ''}
                            >
                                <option value="FullTime">Full-time</option>
                                <option value="PartTime">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                            {errors.jobType && <div className="error-message">{errors.jobType}</div>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group salary-group">
                            <label>Salary Range</label>
                            <div className="salary-inputs">
                                <div className="salary-input-group">
                                    <span className="currency">₹</span>
                                    <input
                                        type="number"
                                        name="salaryMin"
                                        value={jobData.salaryMin}
                                        onChange={handleChange}
                                        className={errors.salaryMin ? 'input-error' : ''}
                                        placeholder="0"
                                    />
                                </div>
                                <span className="salary-separator">TO</span>
                                <div className="salary-input-group">
                                    <span className="currency">₹</span>
                                    <input
                                        type="number"
                                        name="salaryMax"
                                        value={jobData.salaryMax}
                                        onChange={handleChange}
                                        className={errors.salaryMax ? 'input-error' : ''}
                                        placeholder="12000000"
                                    />
                                </div>
                            </div>
                            {(errors.salaryMin || errors.salaryMax) && (
                                <div className="error-message">{errors.salaryMin || errors.salaryMax}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="applicationDeadline">Application Deadline</label>
                            <input
                                type="date"
                                id="applicationDeadline"
                                name="applicationDeadline"
                                value={jobData.applicationDeadline}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            value={jobData.jobDescription}
                            onChange={handleChange}
                            className={errors.jobDescription ? 'input-error' : ''}
                            placeholder="Please share a description to let the candidate know more about the job role"
                            rows="5"
                        ></textarea>
                        {errors.jobDescription && <div className="error-message">{errors.jobDescription}</div>}
                    </div>

                    <div className="form-buttons">
                        <button
                            type="button"
                            className="save-draft-btn"
                            onClick={handleSaveDraft}
                            disabled={loading}
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            className="publish-btn"
                            disabled={loading}
                        >
                            Publish
                        </button>
                    </div>

                    {errors.submit && <div className="submit-error">{errors.submit}</div>}
                </form>
            </div>
        </div>
    );
};

export default CreateJob;
