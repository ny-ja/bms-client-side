import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchBarangayOfficials,
  deleteBarangayOfficial,
} from "../../services/api";
import Header from "../../components/Header";

const BarangayOfficials = () => {
  const [officials, setOfficials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchBarangayOfficials(token)
      .then((response) => {
        setOfficials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangay officials:", error);
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/barangay-officials/create");
  };

  const handleDelete = async (officialId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this official?")) {
      await deleteBarangayOfficial(officialId, token);
      fetchBarangayOfficials(token).then((response) => {
        setOfficials(response.data);
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Barangay Officials List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Official
        </button>
        <table className="min-w-full table-auto shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Term Start</th>
              <th className="px-4 py-2 text-left">Term End</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {officials.map((official) => (
              <tr key={official.id} className="border-b">
                <td className="px-4 py-2">
                  {official.firstName} {official.middleName} {official.lastName}
                </td>
                <td className="px-4 py-2">{official.position}</td>
                <td className="px-4 py-2">{official.termStart}</td>
                <td className="px-4 py-2">{official.termEnd}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/barangay-officials/update/${official.id}`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(official.id)}
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

export default BarangayOfficials;
