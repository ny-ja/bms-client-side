import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBarangayEventById, updateBarangayEvent } from "../../services/api";
import Header from "../../components/Header";

const UpdateBarangayEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    status: "",
    // Add any other fields that are part of your event model
  });
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getBarangayEventById(eventId, token)
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangay event data:", error);
      });
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateBarangayEvent(eventId, eventData, token);
      navigate("/barangay-events");
    } catch (err) {
      console.error("Error updating barangay event:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Update Barangay Event</h1>
      <form onSubmit={handleSubmit}>
        {/* Event Name field */}
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
          />
        </div>
        {/* Description field */}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>
        {/* Start Date field */}
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
          />
        </div>
        {/* End Date field */}
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
          />
        </div>
        {/* Location field */}
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
        </div>
        {/* Organizer field */}
        <div>
          <label>Organizer:</label>
          <input
            type="text"
            name="organizer"
            value={eventData.organizer}
            onChange={handleChange}
          />
        </div>
        {/* Status field */}
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={eventData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {/* Submit button */}
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateBarangayEvent;
