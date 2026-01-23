import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Filter, Briefcase, FileCheck, User, GraduationCap, Clock } from 'lucide-react';
import JobCard from '../components/JobCard';
import ApplicationCard from '../components/ApplicationCard';
import LogoutModal from '../components/LogoutModal';
import JobDetailsModal from '../components/JobDetailsModal';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { jobs, overDeadlineJobs, applications, applyToJob } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('jobs');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
  };

  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobModal = () => {
    setSelectedJob(null);
  };

  // Reset page when tab or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterStatus, searchTerm]);

  // Get all eligible jobs from context (backend already filters)
  const availableJobs = useMemo(() => {
    return jobs;
  }, [jobs]);

  // Get deadline over jobs from context (backend already filters)
  const deadlineOverJobs = useMemo(() => {
    return overDeadlineJobs;
  }, [overDeadlineJobs]);

  // Get applied jobs (for My Applications tab)
  const appliedJobs = useMemo(() => {
    if (!user || !applications) return [];
    return applications
      .map(app => {
        const jobId = typeof app.jobId === 'object' ? app.jobId._id?.toString() || app.jobId._id : app.jobId?.toString() || app.jobId;
        const job = jobs.find(j => {
          const currentJobId = j._id?.toString() || j._id;
          return currentJobId === jobId;
        });
        // If job not in available jobs, try to find in context (it might not be available anymore)
        return { application: app, job: job || app.jobId };
      });
  }, [applications, jobs, user]);
  const filteredAppliedJobs = useMemo(() => {
    return appliedJobs.filter(item => {
      if (filterStatus === 'all') return true;
      return item.application.status === filterStatus;
    });
  }, [appliedJobs, filterStatus]);

  // Filter available jobs by search term
  const filteredAvailableJobs = useMemo(() => {
    return availableJobs.filter(job =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableJobs, searchTerm]);

  // Filter deadline over jobs by search term
  const filteredDeadlineOverJobs = useMemo(() => {
    return deadlineOverJobs.filter(job =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [deadlineOverJobs, searchTerm]);

  // Pagination logic
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data) => {
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  };

  // Paginated data for each tab
  const paginatedAvailableJobs = useMemo(() => {
    return getPaginatedData(filteredAvailableJobs);
  }, [filteredAvailableJobs, currentPage]);

  const paginatedDeadlineOverJobs = useMemo(() => {
    return getPaginatedData(filteredDeadlineOverJobs);
  }, [filteredDeadlineOverJobs, currentPage]);

  const paginatedAppliedJobs = useMemo(() => {
    return getPaginatedData(filteredAppliedJobs);
  }, [filteredAppliedJobs, currentPage]);

  const stats = {
    total: availableJobs.length,
    applied: appliedJobs.filter(a => a.application.status === 'Applied').length,
    shortlisted: appliedJobs.filter(a => a.application.status === 'Shortlisted').length,
    selected: appliedJobs.filter(a => a.application.status === 'Selected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LevelUp by NG</h1>
                <p className="text-sm text-gray-600">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.branch} • Year {user.year}</p>
              </div>
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm mb-1">Total Available Jobs</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Briefcase className="w-10 h-10 text-primary-200" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm mb-1">Applied</p>
                <p className="text-3xl font-bold">{stats.applied}</p>
              </div>
              <FileCheck className="w-10 h-10 text-yellow-200" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Shortlisted</p>
                <p className="text-3xl font-bold">{stats.shortlisted}</p>
              </div>
              <User className="w-10 h-10 text-blue-200" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Selected</p>
                <p className="text-3xl font-bold">{stats.selected}</p>
              </div>
              <GraduationCap className="w-10 h-10 text-green-200" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 sm:px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'jobs'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Available Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 sm:px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'applications'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('deadlineOver')}
              className={`px-4 sm:px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'deadlineOver'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Deadline Over
            </button>
          </div>
        </div>

        {/* Available Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs by company or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {filteredAvailableJobs.length === 0 ? (
              <div className="card text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No jobs available at the moment</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedAvailableJobs.map((job) => {
                    return (
                      <JobCard
                        key={job._id}
                        job={job}
                        applicationStatus={null}
                        onViewDetails={handleViewJobDetails}
                      />
                    );
                  })}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={getTotalPages(filteredAvailableJobs)}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        )}

        {/* Deadline Over Tab */}
        {activeTab === 'deadlineOver' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs by company or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {filteredDeadlineOverJobs.length === 0 ? (
              <div className="card text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No deadline over jobs found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedDeadlineOverJobs.map((job) => {
                    return (
                      <JobCard
                        key={job._id}
                        job={job}
                        applicationStatus={null}
                        onViewDetails={handleViewJobDetails}
                      />
                    );
                  })}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={getTotalPages(filteredDeadlineOverJobs)}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('Applied')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'Applied'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Applied
              </button>
              <button
                onClick={() => setFilterStatus('Shortlisted')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'Shortlisted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Shortlisted
              </button>
              <button
                onClick={() => setFilterStatus('Selected')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'Selected'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Selected
              </button>
              <button
                onClick={() => setFilterStatus('Rejected')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'Rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected
              </button>
            </div>

            {filteredAppliedJobs.length === 0 ? (
              <div className="card text-center py-12">
                <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No applications found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedAppliedJobs.map((item) => (
                    <ApplicationCard
                      key={item.application._id}
                      application={item.application}
                      job={item.job}
                      onViewDetails={handleViewJobDetails}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={getTotalPages(filteredAppliedJobs)}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={handleCloseJobModal}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default StudentDashboard;

