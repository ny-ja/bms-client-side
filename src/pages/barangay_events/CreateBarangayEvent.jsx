import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBarangayEvent } from "../../services/api";
import Header from "../../components/Header";

const CreateBarangayEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createBarangayEvent(eventData, token);
      navigate("/barangay-events");
    } catch (err) {
      console.error("Error creating barangay event:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Create Barangay Event</h1>
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateBarangayEvent;
