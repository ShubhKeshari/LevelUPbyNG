import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { usersAPI } from '../utils/api';
import { CAMPUSES } from '../data/dummyData';
import { X, Search, Check } from 'lucide-react';

const JobForm = ({ job, onClose }) => {
  const { addJob, updateJob } = useData();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    eligibilityCriteria: {
      branch: [],
      year: [],
      minCGPA: '',
      requiredSkills: [],
    },
    applicationDeadline: '',
    campuses: [],
    allowedStudents: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [availableStudents, setAvailableStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch all students from backend on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await usersAPI.getUsers({ role: 'Student' });
        setAllStudents(Array.isArray(students) ? students : []);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName || '',
        jobTitle: job.jobTitle || '',
        jobDescription: job.jobDescription || '',
        eligibilityCriteria: {
          branch: job.eligibilityCriteria?.branch || [],
          year: job.eligibilityCriteria?.year || [],
          minCGPA: job.eligibilityCriteria?.minCGPA || '',
          requiredSkills: job.eligibilityCriteria?.requiredSkills || [],
        },
        applicationDeadline: job.applicationDeadline
          ? new Date(job.applicationDeadline).toISOString().split('T')[0]
          : '',
        campuses: job.campuses || [],
        allowedStudents: job.allowedStudents ? 
          (Array.isArray(job.allowedStudents) ? job.allowedStudents.map(s => 
            typeof s === 'object' ? s._id : s
          ) : [])
          : [],
      });
    }
  }, [job]);

  useEffect(() => {
    // Filter students based on selected campuses
    if (formData.campuses.length > 0) {
      const students = allStudents.filter(
        user => formData.campuses.includes(user.campus)
      );
      setAvailableStudents(students);
    } else {
      setAvailableStudents([]);
    }
  }, [formData.campuses, allStudents]);

  useEffect(() => {
    // Update select all state
    if (availableStudents.length > 0) {
      const allSelected = availableStudents.every(student =>
        formData.allowedStudents.includes(student._id)
      );
      setSelectAll(allSelected);
    } else {
      setSelectAll(false);
    }
  }, [formData.allowedStudents, availableStudents]);

  const branches = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Mathematics'];
  const years = [1, 2, 3, 4];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jobData = {
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      eligibilityCriteria: {
        branch: formData.eligibilityCriteria.branch,
        year: formData.eligibilityCriteria.year.map(y => parseInt(y)),
        minCGPA: parseFloat(formData.eligibilityCriteria.minCGPA),
        requiredSkills: formData.eligibilityCriteria.requiredSkills,
      },
      applicationDeadline: new Date(formData.applicationDeadline),
      campuses: formData.campuses,
      allowedStudents: formData.allowedStudents,
    };

    try {
      if (job) {
        await updateJob(job._id, jobData);
      } else {
        await addJob(jobData);
      }
      onClose();
    } catch (error) {
      alert('Failed to save job: ' + error.message);
    }
  };

  const toggleCampus = (campus) => {
    setFormData(prev => {
      const updatedCampuses = prev.campuses.includes(campus)
        ? prev.campuses.filter(c => c !== campus)
        : [...prev.campuses, campus];
      
      // Filter allowed students to only keep those from selected campuses
      const filteredStudents = prev.allowedStudents.filter(studentId => {
        const student = allStudents.find(s => s._id === studentId);
        return student && updatedCampuses.includes(student.campus);
      });
      
      return {
        ...prev,
        campuses: updatedCampuses,
        allowedStudents: filteredStudents,
      };
    });
  };

  const toggleBranch = (branch) => {
    setFormData(prev => ({
      ...prev,
      eligibilityCriteria: {
        ...prev.eligibilityCriteria,
        branch: prev.eligibilityCriteria.branch.includes(branch)
          ? prev.eligibilityCriteria.branch.filter(b => b !== branch)
          : [...prev.eligibilityCriteria.branch, branch],
      },
    }));
  };

  const toggleYear = (year) => {
    setFormData(prev => ({
      ...prev,
      eligibilityCriteria: {
        ...prev.eligibilityCriteria,
        year: prev.eligibilityCriteria.year.includes(year)
          ? prev.eligibilityCriteria.year.filter(y => y !== year)
          : [...prev.eligibilityCriteria.year, year],
      },
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        eligibilityCriteria: {
          ...prev.eligibilityCriteria,
          requiredSkills: [...prev.eligibilityCriteria.requiredSkills, skillInput.trim()],
        },
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      eligibilityCriteria: {
        ...prev.eligibilityCriteria,
        requiredSkills: prev.eligibilityCriteria.requiredSkills.filter(s => s !== skill),
      },
    }));
  };

  const toggleStudent = (studentId) => {
    setFormData(prev => ({
      ...prev,
      allowedStudents: prev.allowedStudents.includes(studentId)
        ? prev.allowedStudents.filter(id => id !== studentId)
        : [...prev.allowedStudents, studentId],
    }));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setFormData(prev => ({
        ...prev,
        allowedStudents: [],
      }));
    } else {
      const filteredStudents = getFilteredStudents();
      setFormData(prev => ({
        ...prev,
        allowedStudents: filteredStudents.map(s => s._id),
      }));
    }
  };

  const getFilteredStudents = () => {
    return availableStudents.filter(student =>
      student.email.toLowerCase().includes(studentSearchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {job ? 'Edit Job' : 'Post New Job'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="input-field"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            required
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="input-field"
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            required
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            className="input-field"
            rows="4"
            placeholder="Enter job description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Campuses *
          </label>
          <div className="flex flex-wrap gap-2">
            {CAMPUSES.map(campus => (
              <button
                key={campus}
                type="button"
                onClick={() => toggleCampus(campus)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.campuses.includes(campus)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {campus}
              </button>
            ))}
          </div>
        </div>

        {/* Student Selection Section */}
        {formData.campuses.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Select Students ({formData.allowedStudents.length} selected)
              </h3>
              {availableStudents.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {selectAll ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search students by email..."
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
              {getFilteredStudents().length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {availableStudents.length === 0
                    ? 'Select campuses to see students'
                    : 'No students found matching your search'}
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {getFilteredStudents().map((student) => (
                    <label
                      key={student._id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.allowedStudents.includes(student._id)}
                        onChange={() => toggleStudent(student._id)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-xs text-gray-500">
                          {student.branch} • Year {student.year} • {student.campus}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Students Summary */}
            {formData.allowedStudents.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  Selected Students ({formData.allowedStudents.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableStudents
                    .filter(s => formData.allowedStudents.includes(s._id))
                    .map(student => (
                      <div
                        key={student._id}
                        className="flex items-center gap-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                      >
                        <span>{student.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleStudent(student._id)}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eligible Branches *
          </label>
          <div className="flex flex-wrap gap-2">
            {branches.map(branch => (
              <button
                key={branch}
                type="button"
                onClick={() => toggleBranch(branch)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.eligibilityCriteria.branch.includes(branch)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eligible Years *
          </label>
          <div className="flex flex-wrap gap-2">
            {years.map(year => (
              <button
                key={year}
                type="button"
                onClick={() => toggleYear(year)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.eligibilityCriteria.year.includes(year)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Year {year}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum CGPA *
          </label>
          <input
            type="number"
            required
            min="0"
            max="10"
            step="0.1"
            value={formData.eligibilityCriteria.minCGPA}
            onChange={(e) =>
              setFormData({
                ...formData,
                eligibilityCriteria: {
                  ...formData.eligibilityCriteria,
                  minCGPA: e.target.value,
                },
              })
            }
            className="input-field"
            placeholder="e.g., 8.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Required Skills *
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="input-field flex-1"
              placeholder="Enter skill and press Enter"
            />
            <button
              type="button"
              onClick={addSkill}
              className="btn-primary"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.eligibilityCriteria.requiredSkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-primary-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Deadline *
          </label>
          <input
            type="date"
            required
            value={formData.applicationDeadline}
            onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="flex-1 btn-primary">
            {job ? 'Update Job' : 'Post Job'}
          </button>
          <button type="button" onClick={onClose} className="flex-1 btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
