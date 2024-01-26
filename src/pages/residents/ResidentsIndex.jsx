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
    loadResidents();
  }, [loadResidents]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateButtonClick = () => {
    navigate("/residents/create");
  };

  const handleDelete = async (residentId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this resident?")) {
      await deleteResident(residentId, token);
      loadResidents();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Residents List
        </h2>
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleCreateButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Resident
          </button>
          <input
            type="text"
            placeholder="Search by Last Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="shadow border rounded py-2 px-3 text-gray-700"
          />
        </div>
        <table className="min-w-full table-auto shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Occupation</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Civil Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {residents.map((resident) => (
              <tr key={resident.id} className="border-b">
                <td className="px-4 py-2">
                  {resident.firstName} {resident.middleName} {resident.lastName}
                </td>
                <td className="px-4 py-2">{resident.address}</td>
                <td className="px-4 py-2">{resident.contactNumber}</td>
                <td className="px-4 py-2">{resident.occupation}</td>
                <td className="px-4 py-2">{resident.gender}</td>
                <td className="px-4 py-2">{resident.civilStatus}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/residents/update/${resident.id}`)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(resident.id)}
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

export default Residents;
