import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/api";
import Header from "../../components/Header";

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    // Include other fields if your User model requires them
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createUser(userData, token);
      navigate("/users");
    } catch (err) {
      console.error("Error creating user:", err.response || err);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        {/* Email field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        {/* Password field */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        {/* Date of Birth field (optional) */}
        {/* Add other fields as necessary */}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
