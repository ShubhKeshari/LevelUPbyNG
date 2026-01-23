import React from 'react';
import { Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const JobCard = ({ job, applicationStatus, onViewDetails }) => {

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

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const isDeadlinePassed = new Date(job.applicationDeadline) < new Date();

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-primary-600" />
            <h3 className="text-xl font-bold text-gray-900">{job.companyName}</h3>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{job.jobTitle}</h4>
        </div>
        {applicationStatus && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(applicationStatus)}`}>
            {applicationStatus}
          </span>
        )}
        {isDeadlinePassed && !applicationStatus && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-gray-600 border-gray-200">
            Deadline Passed
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.jobDescription}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Branches: {job.eligibilityCriteria.branch.join(', ')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Deadline: {formatDate(job.applicationDeadline)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Min CGPA: {job.eligibilityCriteria.minCGPA}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-gray-500">Required Skills:</span>
        <div className="flex flex-wrap gap-1">
          {job.eligibilityCriteria.requiredSkills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.eligibilityCriteria.requiredSkills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{job.eligibilityCriteria.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {!applicationStatus ? (
          <button
            onClick={() => onViewDetails && onViewDetails(job)}
            className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg text-sm cursor-default"
          >
            {applicationStatus}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;

