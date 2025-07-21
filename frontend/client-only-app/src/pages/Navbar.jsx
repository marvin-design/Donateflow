// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getDashboardPath = () => {
    if (role === "donor") return `/dashboard/donor/${userId}`;
    if (role === "charity") return `/dashboard/charity/${userId}`;
    if (role === "admin") return `/dashboard/admin`;
    return "/";
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/charities">Charities</Link></li>

        {!token && (
          <>
            <li><Link to="/register/donor">Register Donor</Link></li>
            <li><Link to="/login/donor">Login Donor</Link></li>
            <li><Link to="/register/charity">Register Charity</Link></li>
            <li><Link to="/login/charity">Login Charity</Link></li>
            <li><Link to="/login/admin">Login Admin</Link></li>
          </>
        )}

        {token && (
          <>
            <li><Link to={getDashboardPath()}>Dashboard</Link></li>
            <li>Hello, {name}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
