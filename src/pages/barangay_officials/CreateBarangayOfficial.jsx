import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBarangayOfficial } from "../../services/api";
import Header from "../../components/Header";

const CreateBarangayOfficial = () => {
  const [officialData, setOfficialData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    email: "",
    termStart: "",
    termEnd: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createBarangayOfficial(officialData, token);
      navigate("/barangay-officials");
    } catch (err) {
      console.error("Error creating barangay official:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setOfficialData({ ...officialData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Create Barangay Official</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name field */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={officialData.firstName}
            onChange={handleChange}
          />
        </div>
        {/* Middle Name field */}
        <div>
          <label>Middle Name:</label>
          <input
            type="text"
            name="middleName"
            value={officialData.middleName}
            onChange={handleChange}
          />
        </div>
        {/* Last Name field */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={officialData.lastName}
            onChange={handleChange}
          />
        </div>
        {/* Position field */}
        <div>
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={officialData.position}
            onChange={handleChange}
          />
        </div>
        {/* Date of Birth field */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={officialData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        {/* Address field */}
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={officialData.address}
            onChange={handleChange}
          />
        </div>
        {/* Contact Number field */}
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={officialData.contactNumber}
            onChange={handleChange}
          />
        </div>
        {/* Email field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={officialData.email}
            onChange={handleChange}
          />
        </div>
        {/* Term Start field */}
        <div>
          <label>Term Start:</label>
          <input
            type="date"
            name="termStart"
            value={officialData.termStart}
            onChange={handleChange}
          />
        </div>
        {/* Term End field */}
        <div>
          <label>Term End:</label>
          <input
            type="date"
            name="termEnd"
            value={officialData.termEnd}
            onChange={handleChange}
          />
        </div>
        {/* Submit button */}
        <button type="submit">Create Official</button>
      </form>
    </div>
  );
};

export default CreateBarangayOfficial;
