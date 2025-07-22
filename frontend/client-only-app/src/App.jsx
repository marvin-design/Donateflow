import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from './components/Donor/ErrorBoundary';

import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./pages/Navbar";
import LoginForm from "./auth/LoginForm";
import RegisterForm from './auth/RegisterForm';
import CharityDescription from './components/Donor/CharityDescription';
import DonationForm from './components/Donor/DonationForm';
import DonorDashboard from './components/Donor/DonorDashboard';
import CharityList from './components/Donor/CharityList';
import DonationHistory from './components/Donor/DonationHistory';
import DonorProfileForm from './components/Donor/DonorProfileForm';
import Updateprofile from './components/Donor/Updateprofile';
import InventoryList from './components/Charity/InventoryList';
import CharityProfileForm from './components/Charity/CharityProfileForm';
import CharityDashboard from './components/Charity/CharityDashboard';
import CharityApplicationForm from './components/Charity/CharityApplicationForm';
import BeneficiariesList from './components/Charity/BeneficiariesList';
import ThankYou from './pages/Thankyou';

function App() {
  
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register/donor" element={<RegisterForm role='donor' />} />
          <Route path="/register/charity" element={<RegisterForm role='charity' />} />
          <Route path="/login/donor" element={<LoginForm role='donor' />} />
          <Route path="/login/charity" element={<LoginForm role='charity' />} />
          <Route path="/donor/charities" element={<CharityList />} />
          <Route path="/charities/:id" element={<CharityDescription />} />
          <Route path="/donate/:id" element={<DonationForm />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/history" element={<DonationHistory />} />
          <Route path="/donor/profile" element={<DonorProfileForm />} />
          <Route path="/donor/profile/update" element={<Updateprofile />} />
          <Route path="/apply" element={<CharityApplicationForm />} />
          <Route path="/charity/dashboard" element={<CharityDashboard />} />
          <Route path="/charity/beneficiaries" element={<BeneficiariesList />} />
          <Route path="/charity/inventory" element={<InventoryList />} />
          <Route path="/charity/profile" element={<CharityProfileForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
