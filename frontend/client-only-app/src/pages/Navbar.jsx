
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <nav className="p-4 bg-gray-100 shadow-md">
      <div className="flex justify-between items-center">
      
        <ul className="flex space-x-6">
          {!token && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/charities">Charities</Link></li>
              <li><Link to="/login/admin">Admin</Link></li>
            </>
          )}

          {token && role === "donor" && (
            <>
              <li><Link to={`/dashboard/donor/${userId}`}>Dashboard</Link></li>
              <li><Link to="/donor/charities">Charities</Link></li>
            </>
          )}

          {token && role === "charity" && (
            <>
              <li><Link to={`/dashboard/charity/${userId}`}>Dashboard</Link></li>
            </>
          )}

          {token && role === "admin" && (
            <>
              <li><Link to="/dashboard/admin">Dashboard</Link></li>
            </>
          )}
        </ul>

      
        {token && (
          <div className="flex items-center space-x-4">
            <span className="text-green-700 font-semibold">
              Logged in as {name || role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
