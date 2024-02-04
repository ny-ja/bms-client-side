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
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
              <div class="flex flex-col text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Welcome to Barangay Management System Dashboard
                </h1>
              </div>
              <div class="flex flex-wrap -m-4 text-center">
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {totalResidents}
                    </h2>
                    <p class="leading-relaxed">Residents</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                      />
                    </svg>
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {ongoingProjects}
                    </h2>
                    <p class="leading-relaxed">Ongoing Projects</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      {upcomingEvents}
                    </h2>
                    <p class="leading-relaxed">Upcoming Events</p>
                  </div>
                </div>
                <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                    <h2 class="title-font font-medium text-3xl text-gray-900">
                      ₱{totalBudget.toLocaleString()}
                    </h2>
                    <p class="leading-relaxed">Budget for Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
