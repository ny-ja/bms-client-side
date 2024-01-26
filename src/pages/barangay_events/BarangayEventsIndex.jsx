import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBarangayEvents, deleteBarangayEvent } from "../../services/api";
import Header from "../../components/Header";

const BarangayEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchBarangayEvents(token)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangay events:", error);
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/barangay-events/create");
  };

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteBarangayEvent(eventId, token);
      fetchBarangayEvents(token).then((response) => {
        setEvents(response.data);
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Barangay Events List
        </h2>
        <button
          onClick={handleCreateButtonClick}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Event
        </button>
        <table className="min-w-full table-auto bg-white shadow-md rounded">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="px-4 py-2">{event.eventName}</td>
                <td className="px-4 py-2">{event.description}</td>
                <td className="px-4 py-2">{event.startDate}</td>
                <td className="px-4 py-2">{event.endDate}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{event.status}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/barangay-events/update/${event.id}`)
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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

export default BarangayEvents;
