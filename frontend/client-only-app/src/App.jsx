import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./pages/Navbar";
import LoginForm from "./auth/LoginForm";
import SignUpForm from './auth/RegisterForm';
import CharityDescription from './components/Donor/CharityDescription';
import DonationForm from './components/Donor/DonationForm';
import DonorDashboard from './components/Donor/DonorDashboard';
import CharityList from './components/Donor/CharityList';
import DonationHistory from './components/Donor/DonationHistory';
import SearchCharity from './components/Donor/SearchCharity';
import UpdateRecurringStatus from './components/Donor/UpdateRecurringStatus';
import DonorProfileForm from './components/Donor/DonorProfileForm';
import Updateprofile from './components/Donor/Updateprofile';
import InventoryList from './components/Charity/InventoryList';
import CharityProfileForm from './components/Charity/CharityProfileForm';
import CharityDashboard from './components/Charity/CharityDashboard';
import CharityApplicationForm from './components/Charity/CharityApplicationForm';
import BeneficiariesList from './components/Charity/BeneficiariesList';
import RecurringDonations from './components/Donor/RecurringDonations';
import AdminDashboard from './components/Admin/AdminDashboard';
import ApplicationReviewModal from './components/Admin/ApplicationReviewModal';
import CharityApplicationsList from './components/Admin/CharityApplicationsList';
import CharityManagement from './components/Admin/CharityManagement';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register/donor" element={<SignUpForm role="donor" />} />
        <Route path="/register/charity" element={<SignUpForm role="charity" />} />
        <Route path="/login/donor" element={<LoginForm role="donor" />} />
        <Route path="/login/charity" element={<LoginForm role="charity" />} />
        <Route path="/donor/charities" element={<CharityList />} />
        <Route path="/charities/:id" element={<CharityDescription />} />
        <Route path="/donate/:id" element={<DonationForm />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/history" element={<DonationHistory />} />
        <Route path="/donor/profile" element={<DonorProfileForm />} />
        <Route path="/donor/profile/update" element={<Updateprofile />} />
        <Route path="/donor/search-charity" element={<SearchCharity />} />
        <Route path="/donor/update-recurring" element={<UpdateRecurringStatus />} />
        <Route path="/charity/apply" element={<CharityApplicationForm />} />
        <Route path="/charity/dashboard" element={<CharityDashboard />} />
        <Route path="/charity/beneficiaries" element={<BeneficiariesList />} />
        <Route path="/charity/inventory" element={<InventoryList />} />
        <Route path="/charity/profile" element={<CharityProfileForm />} />
        <Route path="/donor/recurring-donations" element={<RecurringDonations />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/review/:id" element={<ApplicationReviewModal />} />
        <Route path="/admin/applications" element={<CharityApplicationsList />} />
        <Route path="/admin/charities" element={<CharityManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
