import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBarangayProjectById,
  updateBarangayProject,
} from "../../services/api";
import Header from "../../components/Header";

const UpdateBarangayProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    budget: "",
    createdBy: "",
  });
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getBarangayProjectById(projectId, token)
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangay project data:", error);
      });
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateBarangayProject(projectId, projectData, token);
      navigate("/barangay-projects");
    } catch (err) {
      console.error("Error updating barangay project:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Barangay Project
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Name field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectName"
              >
                Project Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="projectName"
                type="text"
                name="projectName"
                value={projectData.projectName}
                onChange={handleChange}
              />
            </div>
            {/* Description field */}
            <div className="mb-4 col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleChange}
              />
            </div>
            {/* Start Date field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="startDate"
              >
                Start Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="startDate"
                type="date"
                name="startDate"
                value={projectData.startDate}
                onChange={handleChange}
              />
            </div>
            {/* End Date field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="endDate"
              >
                End Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="endDate"
                type="date"
                name="endDate"
                value={projectData.endDate}
                onChange={handleChange}
              />
            </div>
            {/* Status field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                name="status"
                value={projectData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            {/* Budget field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="budget"
              >
                Budget:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="budget"
                type="number"
                name="budget"
                value={projectData.budget}
                onChange={handleChange}
              />
            </div>
            {/* Created By field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="createdBy"
              >
                Created By:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="createdBy"
                type="text"
                name="createdBy"
                value={projectData.createdBy}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBarangayProject;
