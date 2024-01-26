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
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error fetching barangay events:", error);
      });
  }, []);

  const handleCreateButtonClick = () => {
    navigate("/barangay-events/create"); // Adjust the route as needed
  };

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteBarangayEvent(eventId, token);
      // Reload the list after deletion
      fetchBarangayEvents(token).then(response => {
        setEvents(response.data);
      });
    }
  };

  return (
    <div>
      <Header />
      <h2>Barangay Events List</h2>
      <button onClick={handleCreateButtonClick}>Create Event</button>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th> {/* New column for location */}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.eventName}</td>
              <td>{event.description}</td>
              <td>{event.startDate}</td>
              <td>{event.endDate}</td>
              <td>{event.location}</td> {/* Displaying location */}
              <td>{event.status}</td>
              <td>
                <button
                  onClick={() => navigate(`/barangay-events/update/${event.id}`)}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(event.id)}>
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

export default BarangayEvents;
