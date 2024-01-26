import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/api";
import Header from "../../components/Header";

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserById(userId, token)
      .then((response) => {
        console.log("Fetched user data:", response.data);
        setUserData({
          name: response.data.name,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateUser(userId, userData, token);
      navigate("/users"); // Redirect to the users list after successful update
    } catch (err) {
      console.error("Error updating user:", err.response || err);
      // Handle errors (e.g., display error message)
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <h1>Update User</h1>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
