import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResidentById, updateResident } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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
      navigate("/residents", {
        state: { successMessage: "Resident updated successfully!" },
      });
    } catch (err) {
      console.error("Error updating resident:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setResidentData({ ...residentData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div class="p-4 pt-16 sm:ml-64">
        <div className="container mx-auto p-6">
          <div
            class="
              flex flex-col
              items-start
              justify-between
              pb-6
              space-y-4
              border-b
              lg:items-center lg:space-y-0 lg:flex-row
            "
          >
            <h1 class="text-2xl font-semibold whitespace-nowrap">
              Update Resident
            </h1>
            <button
              onClick={() => navigate(`/residents`)}
              class="
                inline-flex
                items-center
                justify-center
                px-4
                py-1
                space-x-1
                bg-gray-200
                rounded-md
                shadow
                hover:bg-opacity-20
              "
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Back</span>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
            <button
              type="submit"
              class="
                inline-flex
                items-center
                justify-center
                px-4
                py-1
                space-x-1
                bg-gray-200
                rounded-md
                shadow
                hover:bg-opacity-20
              "
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </span>
              <span>Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateResident;
