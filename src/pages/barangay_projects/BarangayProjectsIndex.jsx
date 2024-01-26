import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchBarangayProjects,
  deleteBarangayProject,
} from "../../services/api";
import Header from "../../components/Header";

const BarangayProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchBarangayProjects(token)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangay projects:", error);
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/barangay-projects/create");
  };

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteBarangayProject(projectId, token);
      fetchBarangayProjects(token).then((response) => {
        setProjects(response.data);
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Barangay Projects List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Project
        </button>
        <table className="min-w-full table-auto bg-white shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="px-4 py-2">{project.projectName}</td>
                <td className="px-4 py-2">{project.description}</td>
                <td className="px-4 py-2">{project.startDate}</td>
                <td className="px-4 py-2">{project.endDate}</td>
                <td className="px-4 py-2">{project.status}</td>
                <td className="px-4 py-2">{project.budget}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/barangay-projects/update/${project.id}`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
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
  );
};

export default BarangayProjects;
