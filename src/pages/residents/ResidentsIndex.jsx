import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchResidents, deleteResident } from "../../services/api";
import Header from "../../components/Header";

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const loadResidents = useCallback(() => {
    const token = localStorage.getItem("token");
    fetchResidents(token)
      .then(response => {
        const filteredResidents = searchTerm
          ? response.data.filter(resident =>
              resident.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : response.data;
        setResidents(filteredResidents);
      })
      .catch(error => {
        console.error("Error fetching residents:", error);
      });
  }, [searchTerm]); // searchTerm is a dependency now

  useEffect(() => {
    loadResidents();
  }, [loadResidents]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateButtonClick = () => {
    navigate("/residents/create"); // Navigate to the Create Resident page
  };

  const handleDelete = async (residentId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this resident?")) {
      await deleteResident(residentId, token);
      loadResidents(); // Reload the resident list after deletion
    }
  };

  return (
    <div>
      <Header />
      <h2>Residents List</h2>
      <input
        type="text"
        placeholder="Search by Last Name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleCreateButtonClick}>Create Resident</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Occupation</th>
            <th>Gender</th>
            <th>Civil Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td>
                {resident.firstName} {resident.middleName} {resident.lastName}
              </td>
              <td>{resident.address}</td>
              <td>{resident.contactNumber}</td>
              <td>{resident.email}</td>
              <td>{resident.occupation}</td>
              <td>{resident.gender}</td>
              <td>{resident.civilStatus}</td>
              <td>
                <button
                  onClick={() => navigate(`/residents/update/${resident.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(resident.id)}>
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

export default Residents;
