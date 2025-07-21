import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/RegisterForm"
// import DonorDashboard from "./components/Donor/DonorDashboard";
import CharityDashboard from "./components/Charity/CharityDashboard";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* This should be your first/default route */}
        <Route path="/" element={<Home />} />
        
        {/* Add other routes below */}
        <Route path="/about" element={<About />} />
        <Route path="/register/donor" element={<SignUpForm role="donor"/>} />
        <Route path="/register/charity" element={<SignUpForm role="charity"/>} />
        <Route path="/login/donor" element={<LoginForm role="donor"/>} />
        <Route path="/login/charity" element={<LoginForm role="charity"/>} />
        {/* ... other routes ... */}


        {/* Private Routes */}
        {/* <Route path="/donor" element={<DonorDashboard />} /> */}
        <Route path="/charity" element={<CharityDashboard />} />
      </Routes>
    </>
  );
}

export default App;