import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, User, Mail, GraduationCap, Award, Check, AlertCircle } from 'lucide-react';

const ApplicationList = ({ job, onClose }) => {
  const { applications, updateApplicationStatus, refreshData } = useData();
  const [filterStatus, setFilterStatus] = useState('Applied');
  const [selectedApplications, setSelectedApplications] = useState([]);

  const jobApplications = applications
    .filter(app => {
      const jobId = typeof app.jobId === 'object' ? app.jobId._id?.toString() || app.jobId._id : app.jobId?.toString() || app.jobId;
      const currentJobId = job._id?.toString() || job._id;
      return jobId === currentJobId;
    })
    .map(app => {
      const student = typeof app.studentId === 'object' ? app.studentId : null;
      return { ...app, student };
    })
    .filter(item => item.student);

  const filteredApplications = jobApplications.filter(app => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
    } catch (error) {
      alert('Failed to update status: ' + error.message);
    }
  };

  const toggleApplicationSelection = (applicationId) => {
    setSelectedApplications(prev =>
      prev.includes(applicationId)
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app._id));
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    try {
      await Promise.all(
        selectedApplications.map(appId => updateApplicationStatus(appId, newStatus))
      );
      await refreshData();
      setSelectedApplications([]);
    } catch (error) {
      alert('Failed to update status: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const appliedCount = jobApplications.filter(a => a.status === 'Applied').length;
  const shortlistedCount = jobApplications.filter(a => a.status === 'Shortlisted').length;
  const selectedCount = jobApplications.filter(a => a.status === 'Selected').length;
  const rejectedCount = jobApplications.filter(a => a.status === 'Rejected').length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
          <p className="text-gray-600 mt-1">{job.companyName} - {job.jobTitle}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Status Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        <button
          onClick={() => {
            setFilterStatus('All');
            setSelectedApplications([]);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'All'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({jobApplications.length})
        </button>
        <button
          onClick={() => {
            setFilterStatus('Applied');
            setSelectedApplications([]);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'Applied'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Applied ({appliedCount})
        </button>
        <button
          onClick={() => {
            setFilterStatus('Shortlisted');
            setSelectedApplications([]);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'Shortlisted'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Shortlisted ({shortlistedCount})
        </button>
        <button
          onClick={() => {
            setFilterStatus('Selected');
            setSelectedApplications([]);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'Selected'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Selected ({selectedCount})
        </button>
        <button
          onClick={() => {
            setFilterStatus('Rejected');
            setSelectedApplications([]);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'Rejected'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Rejected ({rejectedCount})
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {filterStatus !== 'All' && filterStatus !== 'Rejected' && selectedApplications.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-900">
              {selectedApplications.length} selected
            </span>
          </div>
          <div className="flex gap-2">
            {filterStatus === 'Applied' && (
              <>
                <button
                  onClick={() => handleBulkStatusUpdate('Shortlisted')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Move to Shortlisted
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('Rejected')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Reject
                </button>
              </>
            )}
            {filterStatus === 'Shortlisted' && (
              <>
                <button
                  onClick={() => handleBulkStatusUpdate('Selected')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Move to Selected
                </button>
                <button
                  onClick={() => handleBulkStatusUpdate('Rejected')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Reject
                </button>
              </>
            )}
            {filterStatus === 'Selected' && (
              <button
                onClick={() => handleBulkStatusUpdate('Rejected')}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Reject
              </button>
            )}
          </div>
        </div>
      )}

      {/* Select All Checkbox for Bulk Actions */}
      {filterStatus !== 'All' && filterStatus !== 'Rejected' && filteredApplications.length > 0 && selectedApplications.length === 0 && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
          <input
            type="checkbox"
            checked={false}
            onChange={toggleSelectAll}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
            Select all {filteredApplications.length} students in this tab
          </label>
        </div>
      )}

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="card text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className={`card transition-colors ${
                selectedApplications.includes(app._id) ? 'bg-blue-50 border-2 border-blue-300' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox for bulk actions */}
                {filterStatus !== 'All' && filterStatus !== 'Rejected' && (
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(app._id)}
                    onChange={() => toggleApplicationSelection(app._id)}
                    className="w-4 h-4 rounded border-gray-300 mt-1"
                  />
                )}

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{app.student.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {app.student.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{app.student.branch}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Year {app.student.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">CGPA: {app.student.CGPA}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Applied: </span>
                      <span className="text-gray-700">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {app.student.skills && app.student.skills.length > 0 && (
                    <div className="mt-3">
                      <span className="text-xs font-medium text-gray-500">Skills: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {app.student.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              {/* Action Buttons - Only show for appropriate tabs */}
              {filterStatus !== 'All' && filterStatus !== 'Rejected' && selectedApplications.length === 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  {filterStatus === 'Applied' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(app._id, 'Shortlisted')}
                        className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, 'Rejected')}
                        className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {filterStatus === 'Shortlisted' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(app._id, 'Selected')}
                        className="flex-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Select
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, 'Rejected')}
                        className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {filterStatus === 'Selected' && (
                    <button
                      onClick={() => handleStatusChange(app._id, 'Rejected')}
                      className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
