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
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Resident
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* Field blocks for each attribute */}
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
              value={residentData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* Repeat for other fields */}
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
              value={residentData.middleName}
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
              value={residentData.lastName}
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
              value={residentData.dateOfBirth}
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
              value={residentData.address}
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
              value={residentData.contactNumber}
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
              value={residentData.email}
              onChange={handleChange}
            />
          </div>
          {/* Occupation field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="occupation"
            >
              Occupation:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="occupation"
              type="text"
              name="occupation"
              value={residentData.occupation}
              onChange={handleChange}
            />
          </div>
          {/* Gender field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender:
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
              id="gender"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="civilStatus"
            >
              Civil Status:
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-white focus:outline-none focus:shadow-outline"
              id="civilStatus"
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
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Resident
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateResident;
