import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const loginUser = (email, password) => {
  return axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchUsers = (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData, token) => {
  return axios.post(`${API_URL}/users`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserById = (id, token) => {
  return axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (id, userData, token) => {
  return axios.put(`${API_URL}/users/${id}`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (id, token) => {
  return axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Resident-related API functions
export const fetchResidents = (token) => {
  return axios.get(`${API_URL}/residents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createResident = (residentData, token) => {
  return axios.post(`${API_URL}/residents`, residentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResidentById = (id, token) => {
  return axios.get(`${API_URL}/residents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateResident = (id, residentData, token) => {
  return axios.put(`${API_URL}/residents/${id}`, residentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteResident = (id, token) => {
  return axios.delete(`${API_URL}/residents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Barangay Official-related API functions

export const fetchBarangayOfficials = (token) => {
  return axios.get(`${API_URL}/barangay-officials`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBarangayOfficial = (officialData, token) => {
  return axios.post(`${API_URL}/barangay-officials`, officialData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBarangayOfficialById = (id, token) => {
  return axios.get(`${API_URL}/barangay-officials/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBarangayOfficial = (id, officialData, token) => {
  return axios.put(`${API_URL}/barangay-officials/${id}`, officialData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBarangayOfficial = (id, token) => {
  return axios.delete(`${API_URL}/barangay-officials/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Barangay Project-related API functions

export const fetchBarangayProjects = (token) => {
  return axios.get(`${API_URL}/barangay-projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBarangayProject = (projectData, token) => {
  return axios.post(`${API_URL}/barangay-projects`, projectData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBarangayProjectById = (id, token) => {
  return axios.get(`${API_URL}/barangay-projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBarangayProject = (id, projectData, token) => {
  return axios.put(`${API_URL}/barangay-projects/${id}`, projectData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBarangayProject = (id, token) => {
  return axios.delete(`${API_URL}/barangay-projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Barangay Event-related API functions

export const fetchBarangayEvents = (token) => {
  return axios.get(`${API_URL}/barangay-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBarangayEvent = (eventData, token) => {
  return axios.post(`${API_URL}/barangay-events`, eventData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBarangayEventById = (id, token) => {
  return axios.get(`${API_URL}/barangay-events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBarangayEvent = (id, eventData, token) => {
  return axios.put(`${API_URL}/barangay-events/${id}`, eventData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBarangayEvent = (id, token) => {
  return axios.delete(`${API_URL}/barangay-events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add more functions to interact with other endpoints
