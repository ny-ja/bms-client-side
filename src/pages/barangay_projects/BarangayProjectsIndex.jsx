import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchBarangayProjects,
  deleteBarangayProject,
} from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const BarangayProjects = () => {
  const [projects, setProjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
    const token = localStorage.getItem("token");
    fetchBarangayProjects(token)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangay projects:", error);
      });
  }, [location, navigate]);

  const handleCreateButtonClick = () => {
    navigate("/barangay-projects/create");
  };

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteBarangayProject(projectId, token);
        setSuccessMessage("Project deleted successfully!");
        fetchBarangayProjects(token).then((response) => {
          setProjects(response.data);
        });
      } catch (error) {
        console.error("Error deleting project:", error);
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
            <h1 class="text-2xl font-semibold whitespace-nowrap">
              Barangay Projects
            </h1>
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
                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>
              </span>
              <span>Add Project</span>
            </button>
          </div>
          <div class="flex flex-col mt-6">
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
                          Project Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Start Date
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          End Date
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Budget
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
                      {projects.map((project) => (
                        <tr
                          key={project.id}
                          class="transition-all hover:bg-gray-100 hover:shadow-lg"
                        >
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {project.projectName}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {project.description}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {project.startDate}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {project.endDate}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {project.status}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                              {project.budget}
                            </div>
                          </td>
                          <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <button
                              onClick={() =>
                                navigate(
                                  `/barangay-projects/update/${project.id}`
                                )
                              }
                              class="text-green-600 hover:text-green-900 mr-6"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
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

export default BarangayProjects;
