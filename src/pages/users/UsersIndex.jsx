import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser } from "../../services/api";
import Header from "../../components/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const token = localStorage.getItem("token");
    fetchUsers(token)
      .then((response) => {
        // Filter out users with isAdmin = true
        const nonAdminUsers = response.data.filter((user) => !user.isAdmin);
        setUsers(nonAdminUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleCreateButtonClick = () => {
    navigate("/users/create"); // Navigate to the Create User page
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId, token);
      loadUsers(); // Reload the user list after deletion
    }
  };

  return (
    <div>
      <Header />
      <h2>Users List</h2>
      <button onClick={handleCreateButtonClick}>Create User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th> {/* New header for actions */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => navigate(`/users/update/${user.id}`)}>
                  Update
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
