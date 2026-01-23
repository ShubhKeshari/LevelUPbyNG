import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jobsAPI, applicationsAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [overDeadlineJobs, setOverDeadlineJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      if (user?.role === 'Admin') {
        const [jobsData, applicationsData] = await Promise.all([
          jobsAPI.getJobs().then(res => res.jobs || res),
          applicationsAPI.getApplications(),
        ]);
        
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
        setOverDeadlineJobs([]);
      } else {
        const [jobsData, overDeadlineData, applicationsData] = await Promise.all([
          jobsAPI.getAvailableJobs(),
          jobsAPI.getOverDeadlineJobs(),
          applicationsAPI.getMyApplications(),
        ]);
        
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setOverDeadlineJobs(Array.isArray(overDeadlineData) ? overDeadlineData : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setJobs([]);
      setOverDeadlineJobs([]);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load initial data
  useEffect(() => {
    loadData();
  }, [loadData]);

  const addJob = async (jobData) => {
    try {
      const newJob = await jobsAPI.createJob(jobData);
      setJobs([newJob, ...jobs]);
      // Refresh both jobs and applications to get updated data
      if (user?.role === 'Admin') {
        const updatedJobs = await jobsAPI.getJobs().then(res => res.jobs || res);
        setJobs(Array.isArray(updatedJobs) ? updatedJobs : []);
        
        const applicationsData = await applicationsAPI.getApplications();
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      } else {
        const [jobsData, overDeadlineData, applicationsData] = await Promise.all([
          jobsAPI.getAvailableJobs(),
          jobsAPI.getOverDeadlineJobs(),
          applicationsAPI.getMyApplications(),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setOverDeadlineJobs(Array.isArray(overDeadlineData) ? overDeadlineData : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      }
      return newJob;
    } catch (error) {
      throw error;
    }
  };

  const updateJob = async (jobId, jobData) => {
    try {
      const updatedJob = await jobsAPI.updateJob(jobId, jobData);
      setJobs(jobs.map(job => {
        const currentJobId = job._id?.toString() || job._id;
        const targetJobId = jobId?.toString() || jobId;
        return currentJobId === targetJobId ? updatedJob : job;
      }));
      // Refresh to ensure we have the latest data
      if (user?.role === 'Admin') {
        const allJobs = await jobsAPI.getJobs().then(res => res.jobs || res);
        setJobs(Array.isArray(allJobs) ? allJobs : []);
      } else {
        const [jobsData, overDeadlineData, applicationsData] = await Promise.all([
          jobsAPI.getAvailableJobs(),
          jobsAPI.getOverDeadlineJobs(),
          applicationsAPI.getMyApplications(),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setOverDeadlineJobs(Array.isArray(overDeadlineData) ? overDeadlineData : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      }
      return updatedJob;
    } catch (error) {
      throw error;
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await jobsAPI.deleteJob(jobId);
      const targetJobId = jobId?.toString() || jobId;
      setJobs(jobs.filter(job => {
        const currentJobId = job._id?.toString() || job._id;
        return currentJobId !== targetJobId;
      }));
      setApplications(applications.filter(app => {
        const appJobId = typeof app.jobId === 'object' ? app.jobId._id?.toString() || app.jobId._id : app.jobId?.toString() || app.jobId;
        return appJobId !== targetJobId;
      }));
    } catch (error) {
      throw error;
    }
  };

  const applyToJob = async (studentId, jobId) => {
    try {
      const newApplication = await applicationsAPI.createApplication(jobId);
      setApplications([newApplication, ...applications]);
      // Refresh jobs to update application status
      if (user?.role === 'Student') {
        const [jobsData, overDeadlineData, applicationsData] = await Promise.all([
          jobsAPI.getAvailableJobs(),
          jobsAPI.getOverDeadlineJobs(),
          applicationsAPI.getMyApplications(),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setOverDeadlineJobs(Array.isArray(overDeadlineData) ? overDeadlineData : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      }
      return { success: true, application: newApplication };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to apply' };
    }
  };

  const rejectJob = async (jobId) => {
    try {
      const newApplication = await applicationsAPI.rejectJob(jobId);
      setApplications([newApplication, ...applications]);
      // Refresh jobs to update application status
      if (user?.role === 'Student') {
        const [jobsData, overDeadlineData, applicationsData] = await Promise.all([
          jobsAPI.getAvailableJobs(),
          jobsAPI.getOverDeadlineJobs(),
          applicationsAPI.getMyApplications(),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setOverDeadlineJobs(Array.isArray(overDeadlineData) ? overDeadlineData : []);
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      }
      return { success: true, application: newApplication };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to reject job' };
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const updatedApplication = await applicationsAPI.updateApplicationStatus(applicationId, newStatus);
      const targetAppId = applicationId?.toString() || applicationId;
      setApplications(
        applications.map(app => {
          const currentAppId = app._id?.toString() || app._id;
          return currentAppId === targetAppId ? updatedApplication : app;
        })
      );
      return updatedApplication;
    } catch (error) {
      throw error;
    }
  };

  const refreshData = () => {
    loadData();
  };

  const value = {
    jobs,
    overDeadlineJobs,
    applications,
    loading,
    addJob,
    updateJob,
    deleteJob,
    applyToJob,
    rejectJob,
    updateApplicationStatus,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

