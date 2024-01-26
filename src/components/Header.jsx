import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-gray-300 shadow">
      <nav className="container mx-auto flex justify-between items-center p-4 flex-wrap">
        <div className="header-left flex items-center w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-xl font-bold mr-8 flex-grow">BMS</h1>
          <button
            onClick={() => navigate("/home")}
            className="mx-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/users")}
            className="mx-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Users
          </button>
          <button
            onClick={() => navigate("/residents")}
            className="mx-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Residents
          </button>
          <button
            onClick={() => navigate("/barangay-officials")}
            className="mx-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Officials
          </button>
          <button
            onClick={() => navigate("/barangay-projects")}
            className="mx-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => navigate("/barangay-events")}
            className="mx-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Events
          </button>
        </div>
        <div className="header-right w-full md:w-auto text-center md:text-right">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
