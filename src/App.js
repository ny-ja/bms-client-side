import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import UsersIndex from "./pages/users/UsersIndex";
import CreateUser from "./pages/users/CreateUser";
import UpdateUser from "./pages/users/UpdateUser";
import ResidentsIndex from "./pages/residents/ResidentsIndex";
import CreateResident from "./pages/residents/CreateResident";
import UpdateResident from "./pages/residents/UpdateResident";
import ResidentDetails from "./pages/residents/ResidentDetails";
import BarangayOfficialsIndex from "./pages/barangay_officials/BarangayOfficialsIndex";
import CreateBarangayOfficial from "./pages/barangay_officials/CreateBarangayOfficial";
import UpdateBarangayOfficial from "./pages/barangay_officials/UpdateBarangayOfficial";
import BarangayProjectsIndex from "./pages/barangay_projects/BarangayProjectsIndex";
import CreateBarangayProject from "./pages/barangay_projects/CreateBarangayProject";
import UpdateBarangayProject from "./pages/barangay_projects/UpdateBarangayProject";
import BarangayEventsIndex from "./pages/barangay_events/BarangayEventsIndex";
import CreateBarangayEvent from "./pages/barangay_events/CreateBarangayEvent";
import UpdateBarangayEvent from "./pages/barangay_events/UpdateBarangayEvent";
import CertificationsIndex from "./pages/certifications/CertificationsIndex";
import CreateCertification from "./pages/certifications/CreateCertification";
import UpdateCertification from "./pages/certifications/UpdateCertification";
import PrintCertification from "./pages/certifications/PrintCertification";

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
        <Route
          path="/residents/update/:residentId"
          element={<UpdateResident />}
        />
        <Route
          path="/residents/details/:residentId"
          element={<ResidentDetails />}
        />

        <Route
          path="/barangay-officials"
          element={<BarangayOfficialsIndex />}
        />
        <Route
          path="/barangay-officials/create"
          element={<CreateBarangayOfficial />}
        />
        <Route
          path="/barangay-officials/update/:officialId"
          element={<UpdateBarangayOfficial />}
        />

        <Route path="/barangay-projects" element={<BarangayProjectsIndex />} />
        <Route
          path="/barangay-projects/create"
          element={<CreateBarangayProject />}
        />
        <Route
          path="/barangay-projects/update/:projectId"
          element={<UpdateBarangayProject />}
        />

        <Route path="/barangay-events" element={<BarangayEventsIndex />} />
        <Route
          path="/barangay-events/create"
          element={<CreateBarangayEvent />}
        />
        <Route
          path="/barangay-events/update/:eventId"
          element={<UpdateBarangayEvent />}
        />

        <Route path="/certifications" element={<CertificationsIndex />} />
        <Route
          path="/certifications/create"
          element={<CreateCertification />}
        />
        <Route
          path="/certifications/update/:certificationId"
          element={<UpdateCertification />}
        />
        <Route
          path="/certifications/print/:certificationId"
          element={<PrintCertification />}
        />
      </Routes>
    </Router>
  );
};

export default App;
