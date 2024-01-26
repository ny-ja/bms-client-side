import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBarangayProjectById, updateBarangayProject } from "../../services/api";
import Header from "../../components/Header";

const UpdateBarangayProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    budget: "",
    createdBy: ""
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
    <div>
      <Header />
      <h1>Update Barangay Project</h1>
      <form onSubmit={handleSubmit}>
        {/* Project Name field */}
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
          />
        </div>
        {/* Description field */}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
          />
        </div>
        {/* Start Date field */}
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={projectData.startDate}
            onChange={handleChange}
          />
        </div>
        {/* End Date field */}
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={projectData.endDate}
            onChange={handleChange}
          />
        </div>
        {/* Status field */}
        <div>
          <label>Status:</label>
          <select
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
        <div>
          <label>Budget:</label>
          <input
            type="number"
            name="budget"
            value={projectData.budget}
            onChange={handleChange}
          />
        </div>
        {/* Created By field */}
        <div>
          <label>Created By:</label>
          <input
            type="text"
            name="createdBy"
            value={projectData.createdBy}
            onChange={handleChange}
          />
        </div>
        {/* Submit button */}
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default UpdateBarangayProject;
