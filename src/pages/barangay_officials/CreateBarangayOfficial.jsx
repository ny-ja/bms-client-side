import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBarangayOfficial } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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
      navigate("/barangay-officials", {
        state: { successMessage: "Official added successfully!" },
      });
    } catch (err) {
      console.error("Error creating barangay official:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setOfficialData({ ...officialData, [e.target.name]: e.target.value });
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
              Add Official
            </h1>
            <button
              onClick={() => navigate(`/barangay-officials`)}
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
                value={officialData.firstName}
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
                value={officialData.middleName}
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
                value={officialData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
                value={officialData.dateOfBirth}
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
                value={officialData.address}
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
                value={officialData.contactNumber}
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
                value={officialData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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

            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
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
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBarangayOfficial;
