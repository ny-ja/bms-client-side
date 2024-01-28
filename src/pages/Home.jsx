import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Barangay Management System Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">Total Residents</h2>
            <p className="text-gray-600">1,250</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">
              Ongoing Projects
            </h2>
            <p className="text-gray-600">8</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">Upcoming Events</h2>
            <p className="text-gray-600">5</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">
              Total Budget for Projects
            </h2>
            <p className="text-gray-600">₱2,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
