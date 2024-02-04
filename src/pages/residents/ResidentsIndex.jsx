import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchResidents, deleteResident } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const loadResidents = useCallback(() => {
    const token = localStorage.getItem("token");
    fetchResidents(token)
      .then((response) => {
        const filteredResidents = searchTerm
          ? response.data.filter((resident) =>
              resident.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : response.data;
        setResidents(filteredResidents);
      })
      .catch((error) => {
        console.error("Error fetching residents:", error);
      });
  }, [searchTerm]);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
    loadResidents();
  }, [location, navigate, loadResidents]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateButtonClick = () => {
    navigate("/residents/create");
  };

  const handleDelete = async (residentId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this resident?")) {
      try {
        await deleteResident(residentId, token);
        setSuccessMessage("Resident deleted successfully!"); // Set success message here
        loadResidents(); // Reload the list of residents to reflect the deletion
      } catch (error) {
        console.error("Error deleting resident:", error);
        // Optionally, handle error feedback to the user
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div class="p-4 pt-16 sm:ml-64">
        <div className="container mx-auto p-6">
          {successMessage && (
            <div
              id="toast-success"
              className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">{successMessage}</div>
              <button
                type="button"
                onClick={() => setSuccessMessage("")}
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}
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
            <h1 class="text-2xl font-semibold whitespace-nowrap">Residents</h1>
            <button
              onClick={handleCreateButtonClick}
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
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </span>
              <span>Add Resident</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-6"></div>
          <div class="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
            <svg
              class="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search by Last Name"
              value={searchTerm}
              onChange={handleSearchChange}
              class="
                  px-4
                  py-3
                  rounded-md
                  hover:bg-gray-100
                  lg:max-w-sm
                  md:py-2 md:flex-1
                  focus:outline-none
                  md:focus:bg-gray-100 md:focus:shadow md:focus:border
                "
            />
          </div>
          <div class="flex flex-col mt-2">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                  <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Gender
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Civil Status
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {residents.map((resident) => (
                        <tr
                          key={resident.id}
                          class="transition-all hover:bg-gray-100 hover:shadow-lg"
                        >
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500 mr-6">
                              {resident.firstName} {resident.middleName}{" "}
                              {resident.lastName}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {resident.address}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {resident.contactNumber}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {resident.gender}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {resident.civilStatus}
                            </div>
                          </td>
                          <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <button
                              onClick={() =>
                                navigate(`/residents/update/${resident.id}`)
                              }
                              class="text-green-600 hover:text-green-900 mr-6"
                            >
                              Update
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/residents/details/${resident.id}`)
                              }
                              className="text-blue-600 hover:text-blue-900 mr-6"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => handleDelete(resident.id)}
                              class="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Residents;
