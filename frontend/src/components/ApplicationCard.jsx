import React from 'react';
import { Building2, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

const ApplicationCard = ({ application, job, onViewDetails }) => {

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

  if (!job) return null;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => onViewDetails && onViewDetails(job)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900">{job.companyName}</h3>
          </div>
          <h4 className="text-base font-semibold text-gray-800">{job.jobTitle}</h4>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Applied: {formatDate(application.appliedAt)}</span>
        </div>
        {application.updatedAt && application.updatedAt !== application.appliedAt && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Updated: {formatDate(application.updatedAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;

