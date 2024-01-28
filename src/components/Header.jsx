import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center p-4 flex-wrap">
        <div className="header-left flex items-center w-full md:w-auto mb-4 md:mb-0">
          <img src="/bms-logo.png" alt="BMS Logo" className="mr-3 h-16" />
          <h1 className="text-2xl font-bold mr-8 flex-grow">BMS</h1>
          <button
            onClick={() => navigate("/home")}
            className="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition duration-300 uppercase"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/users")}
            className="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition duration-300 uppercase"
          >
            Users
          </button>
          <button
            onClick={() => navigate("/residents")}
            className="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition duration-300 uppercase"
          >
            Residents
          </button>
          <button
            onClick={() => navigate("/barangay-officials")}
            className="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition duration-300 uppercase"
          >
            Officials
          </button>
          <button
            onClick={() => navigate("/barangay-projects")}
            className="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition duration-300 uppercase"
          >
            Projects
          </button>
          <button
            onClick={() => navigate("/barangay-events")}
            className="mx-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition duration-300 uppercase"
          >
            Events
          </button>
        </div>
        <div className="header-right w-full md:w-auto text-center md:text-right">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition duration-300 uppercase"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
