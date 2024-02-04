import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBarangayEvent } from "../../services/api";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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
      navigate("/barangay-events", {
        state: { successMessage: "Event added successfully!" },
      });
    } catch (err) {
      console.error("Error creating barangay event:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div class="p-4 pt-16 sm:ml-64">
        <div className="container mx-auto p-6">
          <div
            class="
              flex flex-col
              items-start
              justify-between
              pb-6
              space-y-4
              border-b
              lg:items-center lg:space-y-0 lg:flex-row
            "
          >
            <h1 class="text-2xl font-semibold whitespace-nowrap">Add Event</h1>
            <button
              onClick={() => navigate(`/barangay-events`)}
              class="
                inline-flex
                items-center
                justify-center
                px-4
                py-1
                space-x-1
                bg-gray-200
                rounded-md
                shadow
                hover:bg-opacity-20
              "
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Back</span>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="eventName"
              >
                Event Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="eventName"
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                  htmlFor="startDate"
                >
                  Start Date:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="startDate"
                  type="date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                  htmlFor="endDate"
                >
                  End Date:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="endDate"
                  type="date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                  htmlFor="location"
                >
                  Location:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                  htmlFor="organizer"
                >
                  Organizer:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="organizer"
                  type="text"
                  name="organizer"
                  value={eventData.organizer}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
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
            <button
              type="submit"
              class="
                inline-flex
                items-center
                justify-center
                px-4
                py-1
                space-x-1
                bg-gray-200
                rounded-md
                shadow
                hover:bg-opacity-20
              "
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBarangayEvent;
