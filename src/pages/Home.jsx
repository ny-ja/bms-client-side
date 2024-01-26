import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to the Home Page
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">Card Title 1</h2>
            <p className="text-gray-600">Dummy Value</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">Card Title 2</h2>
            <p className="text-gray-600">Dummy Value</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">Card Title 3</h2>
            <p className="text-gray-600">Dummy Value</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-bold text-gray-700">Card Title 4</h2>
            <p className="text-gray-600">Dummy Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
