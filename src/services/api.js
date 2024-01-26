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

// Add more functions to interact with other endpoints
