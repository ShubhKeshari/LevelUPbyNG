import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { X, Building2, Calendar, MapPin, Award, AlertCircle, Check, XIcon } from 'lucide-react';
import { format } from 'date-fns';

const JobDetailsModal = ({ job, isOpen, onClose }) => {
  const { user } = useAuth();
  const { applications, applyToJob, rejectJob } = useData();
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null });
  
  if (!isOpen || !job) return null;

  // Find application status
  const application = applications.find(a => {
    const studentId = typeof a.studentId === 'object' ? a.studentId._id?.toString() || a.studentId._id : a.studentId?.toString() || a.studentId;
    const jobId = typeof a.jobId === 'object' ? a.jobId._id?.toString() || a.jobId._id : a.jobId?.toString() || a.jobId;
    const currentUserId = user._id?.toString() || user._id;
    const currentJobId = job._id?.toString() || job._id;
    return studentId === currentUserId && jobId === currentJobId;
  });
  const applicationStatus = application ? application.status : null;

  const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  const isDeadlinePassed = new Date(job.applicationDeadline) < new Date();

  const handleApplyClick = () => {
    setConfirmModal({ isOpen: true, action: 'apply' });
  };

  const handleRejectClick = () => {
    setConfirmModal({ isOpen: true, action: 'reject' });
  };

  const handleConfirmApply = async () => {
    if (user.role === 'Student') {
      const result = await applyToJob(user._id, job._id);
      if (result.success) {
        alert('Application submitted successfully!');
        setConfirmModal({ isOpen: false, action: null });
        onClose();
      } else {
        alert(result.error);
      }
    }
  };

  const handleConfirmReject = async () => {
    if (user.role === 'Student') {
      const result = await rejectJob(job._id);
      if (result.success) {
        alert('Job rejected successfully!');
        setConfirmModal({ isOpen: false, action: null });
        onClose();
      } else {
        alert(result.error);
      }
    }
  };

  const handleCloseConfirm = () => {
    setConfirmModal({ isOpen: false, action: null });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 transform transition-all animate-slide-up">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{job.companyName}</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mt-1">{job.jobTitle}</h2>
                  </div>
                </div>
              </div>
              {applicationStatus && (
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                  applicationStatus === 'Selected' ? 'bg-green-100 text-green-800 border-green-200' :
                  applicationStatus === 'Shortlisted' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  applicationStatus === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
                  'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}>
                  {applicationStatus}
                </span>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Application Deadline: <strong>{formatDate(job.applicationDeadline)}</strong></span>
              </div>
              {job.eligibilityCriteria.branch.length > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Eligible Branches: <strong>{job.eligibilityCriteria.branch.join(', ')}</strong></span>
                </div>
              )}
              {job.eligibilityCriteria.minCGPA > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5" />
                  <span>Minimum CGPA: <strong>{job.eligibilityCriteria.minCGPA}</strong></span>
                </div>
              )}
              {job.eligibilityCriteria.year.length > 0 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>Eligible Years: <strong>Year {job.eligibilityCriteria.year.join(', Year ')}</strong></span>
                </div>
              )}
            </div>

            {job.eligibilityCriteria.requiredSkills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.eligibilityCriteria.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.jobDescription}</p>
            </div>

            {user.role === 'Student' && (
              <div className="border-t border-gray-200 pt-6">
                {!applicationStatus && !isDeadlinePassed && (
                  <div className="flex gap-3">
                    <button 
                      onClick={handleApplyClick} 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Check className="w-5 h-5" />
                      Apply Now
                    </button>
                    <button 
                      onClick={handleRejectClick} 
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <XIcon className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                )}
                {isDeadlinePassed && !applicationStatus && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-600" />
                    <p className="text-gray-700 text-sm">The application deadline for this job has passed.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scale-up">
            <div className="p-8">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {confirmModal.action === 'apply' ? 'Apply to Job?' : 'Reject Job?'}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {confirmModal.action === 'apply' 
                  ? 'Are you sure you want to apply for this position?' 
                  : 'Are you sure you want to reject this job? This action cannot be undone.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCloseConfirm}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.action === 'apply' ? handleConfirmApply : handleConfirmReject}
                  className={`flex-1 px-4 py-3 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    confirmModal.action === 'apply' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {confirmModal.action === 'apply' ? (
                    <>
                      <Check className="w-5 h-5" />
                      Yes, Apply
                    </>
                  ) : (
                    <>
                      <XIcon className="w-5 h-5" />
                      Yes, Reject
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetailsModal;

