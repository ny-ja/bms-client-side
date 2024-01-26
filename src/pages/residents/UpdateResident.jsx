import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResidentById, updateResident } from "../../services/api";
import Header from "../../components/Header";

const UpdateResident = () => {
  const [residentData, setResidentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    email: "",
    occupation: "",
    gender: "",
    civilStatus: "",
  });
  const { residentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getResidentById(residentId, token)
      .then((response) => {
        setResidentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resident data:", error);
      });
  }, [residentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateResident(residentId, residentData, token);
      navigate("/residents");
    } catch (err) {
      console.error("Error updating resident:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setResidentData({ ...residentData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Update Resident</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name field */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={residentData.firstName}
            onChange={handleChange}
          />
        </div>
        {/* Middle Name field */}
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={residentData.middleName}
            onChange={handleChange}
          />
        </div>
        {/* Last Name field */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={residentData.lastName}
            onChange={handleChange}
          />
        </div>
        {/* Date of Birth field */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={residentData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        {/* Address field */}
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={residentData.address}
            onChange={handleChange}
          />
        </div>
        {/* Contact Number field */}
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={residentData.contactNumber}
            onChange={handleChange}
          />
        </div>
        {/* Email field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={residentData.email}
            onChange={handleChange}
          />
        </div>
        {/* Occupation field */}
        <div>
          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={residentData.occupation}
            onChange={handleChange}
          />
        </div>
        {/* Gender field */}
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={residentData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Civil Status field */}
        <div>
          <label>Civil Status:</label>
          <select
            name="civilStatus"
            value={residentData.civilStatus}
            onChange={handleChange}
          >
            <option value="">Select Civil Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
        <button type="submit">Update Resident</button>
      </form>
    </div>
  );
};

export default UpdateResident;
