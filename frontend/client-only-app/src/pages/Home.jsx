n// src/pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to DonateFlow</h1>

      <div>
        <h2>Are you a Donor?</h2>
        <Link to="/register/donor">Register as Donor</Link><br />
        <Link to="/login/donor">Login as Donor</Link>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Are you a Charity?</h2>
        <Link to="/register/charity">Register as Charity</Link><br />
        <Link to="/login/charity">Login as Charity</Link>
      </div>
    </div>
  );
};

export default Home;
