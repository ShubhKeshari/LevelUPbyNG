import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Users, Briefcase, GraduationCap, Search } from 'lucide-react';
import JobForm from '../components/JobForm';
import ApplicationList from '../components/ApplicationList';
import LogoutModal from '../components/LogoutModal';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { jobs, applications, deleteJob } = useData();
  const navigate = useNavigate();
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteJob(jobId);
      } catch (error) {
        alert('Failed to delete job: ' + error.message);
      }
    }
  };

  const handleViewApplications = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobForm = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  // Pagination logic
  const getTotalPages = (data) => {
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  };

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const stats = {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    selected: applications.filter(a => a.status === 'Selected').length,
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
                <p className="text-sm text-gray-600">Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">Placement Team</p>
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
                <p className="text-primary-100 text-sm mb-1">Total Jobs</p>
                <p className="text-3xl font-bold">{stats.totalJobs}</p>
              </div>
              <Briefcase className="w-10 h-10 text-primary-200" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Applications</p>
                <p className="text-3xl font-bold">{stats.totalApplications}</p>
              </div>
              <Users className="w-10 h-10 text-blue-200" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm mb-1">Shortlisted</p>
                <p className="text-3xl font-bold">{stats.shortlisted}</p>
              </div>
              <Users className="w-10 h-10 text-yellow-200" />
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

        {/* Actions Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full sm:w-auto sm:min-w-[300px]"
            />
          </div>
          <button
            onClick={() => {
              setEditingJob(null);
              setShowJobForm(true);
            }}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </button>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="card text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No jobs posted yet</p>
            <button onClick={() => setShowJobForm(true)} className="btn-primary">
              Post Your First Job
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paginatedJobs.map((job) => {
                const jobApplications = applications.filter(app => app.jobId === job._id);
                return (
                  <div key={job._id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.companyName}</h3>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{job.jobTitle}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.jobDescription}</p>
                        {job.campuses && job.campuses.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs text-gray-500">Campuses: </span>
                            <span className="text-xs font-medium text-gray-700">
                              {job.campuses.join(', ')}
                            </span>
                          </div>
                        )}
                        {job.allowedStudents && job.allowedStudents.length > 0 && (
                          <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                              {job.allowedStudents.length} Allowed Students
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {jobApplications.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {jobApplications.filter(a => a.status === 'Applied').length > 0 && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                            {jobApplications.filter(a => a.status === 'Applied').length} Applied
                          </span>
                        )}
                        {jobApplications.filter(a => a.status === 'Shortlisted').length > 0 && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {jobApplications.filter(a => a.status === 'Shortlisted').length} Shortlisted
                          </span>
                        )}
                        {jobApplications.filter(a => a.status === 'Selected').length > 0 && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            {jobApplications.filter(a => a.status === 'Selected').length} Selected
                          </span>
                        )}
                        {jobApplications.filter(a => a.status === 'Rejected').length > 0 && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            {jobApplications.filter(a => a.status === 'Rejected').length} Rejected
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewApplications(job)}
                        className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        View Applications
                      </button>
                      <button
                        onClick={() => handleEdit(job)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={getTotalPages(filteredJobs)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <JobForm job={editingJob} onClose={handleCloseJobForm} />
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ApplicationList job={selectedJob} onClose={() => setSelectedJob(null)} />
          </div>
        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default AdminDashboard;

