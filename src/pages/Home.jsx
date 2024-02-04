import React, { useState, useEffect } from "react";
import {
  fetchResidents,
  fetchBarangayProjects,
  fetchBarangayEvents,
} from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [totalResidents, setTotalResidents] = useState(0);
  const [ongoingProjects, setOngoingProjects] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login...");
      return;
    }

    const fetchData = async () => {
      try {
        const residentsResponse = await fetchResidents(token);
        setTotalResidents(residentsResponse.data.length);

        const projectsResponse = await fetchBarangayProjects(token);
        setOngoingProjects(
          projectsResponse.data.filter(
            (project) => project.status === "In Progress"
          ).length
        );
        setTotalBudget(
          projectsResponse.data.reduce(
            (acc, project) => acc + parseFloat(project.budget || 0),
            0
          )
        );

        const eventsResponse = await fetchBarangayEvents(token);
        setUpcomingEvents(
          eventsResponse.data.filter(
            (event) => new Date(event.startDate) > new Date()
          ).length
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="p-4 pt-16 sm:ml-64">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome to Barangay Management System Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-bold text-gray-700">
                Total Residents
              </h2>
              <p className="text-gray-600">{totalResidents}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-bold text-gray-700">
                Ongoing Projects
              </h2>
              <p className="text-gray-600">{ongoingProjects}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-bold text-gray-700">
                Upcoming Events
              </h2>
              <p className="text-gray-600">{upcomingEvents}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-bold text-gray-700">
                Total Budget for Projects
              </h2>
              <p className="text-gray-600">₱{totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
