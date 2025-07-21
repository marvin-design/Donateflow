// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";

// Auth components
import Register from "./auth/RegisterForm";
import Login from "./auth/LoginForm";
import PrivateRoute from "./auth/PrivateRoute";

// Dashboards
import DonorDashboard from "./components/Donor/DonorDashboard";
import CharityDashboard from "./components/Charity/CharityDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div><h2>About Page</h2></div>} />
        <Route path="/charities" element={<div><h2>Charities Page</h2></div>} />

        {/* Registration */}
        <Route path="/register/donor" element={<Register role="donor" />} />
        <Route path="/register/charity" element={<Register role="charity" />} />
        <Route path="/register/admin" element={<Register role="admin" />} />

        {/* Login */}
        <Route path="/login/donor" element={<Login role="donor" />} />
        <Route path="/login/charity" element={<Login role="charity" />} />
        <Route path="/login/admin" element={<Login role="admin" />} />

        {/* Protected Donor Dashboard */}
        <Route element={<PrivateRoute allowedRoles={["donor"]} />}>
          <Route path="/dashboard/donor/:id" element={<DonorDashboard />} />
        </Route>

        {/* Protected Charity Dashboard */}
        <Route element={<PrivateRoute allowedRoles={["charity"]} />}>
          <Route path="/dashboard/charity/:id" element={<CharityDashboard />} />
        </Route>

        {/* Protected Admin Dashboard */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
