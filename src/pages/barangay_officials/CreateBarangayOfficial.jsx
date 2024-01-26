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
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create Barangay Official
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* First Name field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              name="firstName"
              value={officialData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Middle Name field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="middleName"
            >
              Middle Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="middleName"
              type="text"
              name="middleName"
              value={officialData.middleName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              name="lastName"
              value={officialData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Position field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="position"
              type="text"
              name="position"
              value={officialData.position}
              onChange={handleChange}
            />
          </div>

          {/* Date of Birth field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            >
              Date of Birth:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={officialData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* Address field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              value={officialData.address}
              onChange={handleChange}
            />
          </div>

          {/* Contact Number field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactNumber"
            >
              Contact Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contactNumber"
              type="text"
              name="contactNumber"
              value={officialData.contactNumber}
              onChange={handleChange}
            />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={officialData.email}
              onChange={handleChange}
            />
          </div>

          {/* Term Start field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="termStart"
            >
              Term Start:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="termStart"
              type="date"
              name="termStart"
              value={officialData.termStart}
              onChange={handleChange}
            />
          </div>

          {/* Term End field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="termEnd"
            >
              Term End:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="termEnd"
              type="date"
              name="termEnd"
              value={officialData.termEnd}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Official
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBarangayOfficial;
