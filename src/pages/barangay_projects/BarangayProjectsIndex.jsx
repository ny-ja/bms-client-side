import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBarangayProjects, deleteBarangayProject } from "../../services/api";
import Header from "../../components/Header";

const BarangayProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchBarangayProjects(token)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("Error fetching barangay projects:", error);
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/barangay-projects/create"); // Adjust the route as needed
  };

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteBarangayProject(projectId, token);
      // Reload the list after deletion
      fetchBarangayProjects(token).then(response => {
        setProjects(response.data);
      });
    }
  };

  return (
    <div>
      <Header />
      <h2>Barangay Projects List</h2>
      <button onClick={handleCreateButtonClick}>Create Project</button>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.description}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.status}</td>
              <td>{project.budget}</td>
              <td>
                <button
                  onClick={() => navigate(`/barangay-projects/update/${project.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarangayProjects;
