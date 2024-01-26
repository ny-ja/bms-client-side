import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import UsersIndex from './pages/users/UsersIndex';
import CreateUser from './pages/users/CreateUser';
import UpdateUser from './pages/users/UpdateUser';
import ResidentsIndex from './pages/residents/ResidentsIndex';
import CreateResident from './pages/residents/CreateResident';
import UpdateResident from './pages/residents/UpdateResident';
import BarangayOfficialsIndex from './pages/barangay_officials/BarangayOfficialsIndex';
import CreateBarangayOfficial from './pages/barangay_officials/CreateBarangayOfficial';
import UpdateBarangayOfficial from './pages/barangay_officials/UpdateBarangayOfficial';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/users" element={<UsersIndex />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/update/:userId" element={<UpdateUser />} />

        <Route path="/residents" element={<ResidentsIndex />} />
        <Route path="/residents/create" element={<CreateResident />} />
        <Route path="/residents/update/:residentId" element={<UpdateResident />} />

        <Route path="/barangay-officials" element={<BarangayOfficialsIndex />} />
        <Route path="/barangay-officials/create" element={<CreateBarangayOfficial />} />
        <Route path="/barangay-officials/update/:officialId" element={<UpdateBarangayOfficial />} />
      </Routes>
    </Router>
  );
};

export default App;
