import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBarangayOfficials, deleteBarangayOfficial } from "../../services/api";
import Header from "../../components/Header";

const BarangayOfficials = () => {
  const [officials, setOfficials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchBarangayOfficials(token)
      .then(response => {
        setOfficials(response.data);
      })
      .catch(error => {
        console.error("Error fetching barangay officials:", error);
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/barangay-officials/create"); // Adjust the route as needed
  };

  const handleDelete = async (officialId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this official?")) {
      await deleteBarangayOfficial(officialId, token);
      // Reload the list after deletion
      fetchBarangayOfficials(token).then(response => {
        setOfficials(response.data);
      });
    }
  };

  return (
    <div>
      <Header />
      <h2>Barangay Officials List</h2>
      <button onClick={handleCreateButtonClick}>Create Official</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Term Start</th>
            <th>Term End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {officials.map((official) => (
            <tr key={official.id}>
              <td>
                {official.firstName} {official.middleName} {official.lastName}
              </td>
              <td>{official.position}</td>
              <td>{official.termStart}</td>
              <td>{official.termEnd}</td>
              <td>
                <button
                  onClick={() => navigate(`/barangay-officials/update/${official.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(official.id)}>
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

export default BarangayOfficials;
