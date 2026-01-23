const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Make API request
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Something went wrong');
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    // Re-throw if it's already an Error object
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(error.message || 'Network error occurred');
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },
  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// Jobs API
export const jobsAPI = {
  getJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/jobs${queryString ? `?${queryString}` : ''}`);
  },
  getJob: async (id) => {
    return apiRequest(`/jobs/${id}`);
  },
  getAvailableJobs: async () => {
    return apiRequest('/jobs/available');
  },
  getOverDeadlineJobs: async () => {
    return apiRequest('/jobs/overdeadline');
  },
  createJob: async (jobData) => {
    return apiRequest('/jobs', {
      method: 'POST',
      body: jobData,
    });
  },
  updateJob: async (id, jobData) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'PUT',
      body: jobData,
    });
  },
  deleteJob: async (id) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Applications API
export const applicationsAPI = {
  getApplications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/applications${queryString ? `?${queryString}` : ''}`);
  },
  getApplication: async (id) => {
    return apiRequest(`/applications/${id}`);
  },
  getMyApplications: async () => {
    return apiRequest('/applications/my');
  },
  createApplication: async (jobId) => {
    return apiRequest('/applications', {
      method: 'POST',
      body: { jobId },
    });
  },
  rejectJob: async (jobId) => {
    return apiRequest('/applications/reject', {
      method: 'POST',
      body: { jobId },
    });
  },
  updateApplicationStatus: async (id, status) => {
    return apiRequest(`/applications/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
  },
};

// Users API
export const usersAPI = {
  getUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users${queryString ? `?${queryString}` : ''}`);
  },
  getUser: async (id) => {
    return apiRequest(`/users/${id}`);
  },
  updateUser: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: userData,
    });
  },
};
