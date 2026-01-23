import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { isEligible } from '../data/dummyData';
import { ArrowLeft, Building2, Calendar, MapPin, Award, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const JobDetails = () => {
  const { jobId } = useParams();
  const { user } = useAuth();
  const { jobs, applications, applyToJob } = useData();
  const navigate = useNavigate();

  const job = jobs.find(j => {
    const currentJobId = j._id?.toString() || j._id;
    const targetJobId = jobId?.toString() || jobId;
    return currentJobId === targetJobId;
  });
  
  // Find application status
  const application = applications.find(a => {
    const studentId = typeof a.studentId === 'object' ? a.studentId._id?.toString() || a.studentId._id : a.studentId?.toString() || a.studentId;
    const appJobId = typeof a.jobId === 'object' ? a.jobId._id?.toString() || a.jobId._id : a.jobId?.toString() || a.jobId;
    const currentUserId = user._id?.toString() || user._id;
    const targetJobId = jobId?.toString() || jobId;
    return studentId === currentUserId && appJobId === targetJobId;
  });
  const applicationStatus = application ? application.status : null;
  
  const eligible = user.role === 'Student' && user && job ? isEligible(user, job) : true;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Job not found</p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  const handleApply = async () => {
    if (user.role === 'Student') {
      const result = await applyToJob(user._id, jobId);
      if (result.success) {
        alert('Application submitted successfully!');
        navigate('/student');
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="card mb-6">
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
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Application Deadline: <strong>{formatDate(job.applicationDeadline)}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Eligible Branches: <strong>{job.eligibilityCriteria.branch.join(', ')}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5" />
              <span>Minimum CGPA: <strong>{job.eligibilityCriteria.minCGPA}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>Eligible Years: <strong>Year {job.eligibilityCriteria.year.join(', Year ')}</strong></span>
            </div>
          </div>

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

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.jobDescription}</p>
          </div>
        </div>

        {user.role === 'Student' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Check</h3>
            {user && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  {job.eligibilityCriteria.branch.includes(user.branch) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={job.eligibilityCriteria.branch.includes(user.branch) ? 'text-green-700' : 'text-red-700'}>
                    Branch: {user.branch || 'N/A'} {job.eligibilityCriteria.branch.includes(user.branch) ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {job.eligibilityCriteria.year.includes(user.year) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={job.eligibilityCriteria.year.includes(user.year) ? 'text-green-700' : 'text-red-700'}>
                    Year: {user.year || 'N/A'} {job.eligibilityCriteria.year.includes(user.year) ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {user.CGPA >= job.eligibilityCriteria.minCGPA ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={user.CGPA >= job.eligibilityCriteria.minCGPA ? 'text-green-700' : 'text-red-700'}>
                    CGPA: {user.CGPA || 'N/A'} {user.CGPA >= job.eligibilityCriteria.minCGPA ? '✓' : '✗'} (Required: {job.eligibilityCriteria.minCGPA})
                  </span>
                </div>
              </div>
            )}

            {eligible && !applicationStatus && (
              <button onClick={handleApply} className="w-full btn-primary">
                Apply Now
              </button>
            )}
            {!eligible && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">You are not eligible for this position based on the criteria above.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;

