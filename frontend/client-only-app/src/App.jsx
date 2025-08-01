import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/Donor/ErrorBoundary';
import Home from "./pages/Home";
import About from "./pages/About";
import LoginForm from "./auth/LoginForm";
import RegisterForm from './auth/RegisterForm';
import CharityDescription from './components/Donor/CharityDescription';
import DonationForm from './components/Donor/DonationForm';
import DonorDashboard from './components/Donor/DonorDashboard';
import CharityList from './components/Donor/CharityList';
import DonationHistory from './components/Donor/DonationHistory';
import SearchCharity from './components/Donor/SearchCharity';
import UpdateRecurringStatus from './components/Donor/UpdateRecurringStatus';
import Updateprofile from './components/Donor/Updateprofile';
import InventoryList from './components/Charity/InventoryList';
import CharityProfileForm from './components/Charity/CharityProfileForm';
import CharityDashboard from './components/Charity/CharityDashboard';
import CharityApplicationForm from './components/Charity/CharityApplicationForm';
import BeneficiariesList from './components/Charity/BeneficiariesList';
import ThankYou from './pages/Thankyou';
import RecurringDonations from './components/Donor/RecurringDonations';
import AdminDashboard from './components/Admin/AdminDashboard';
import Navbar from './pages/Navbar';
import CreateStoryForm from './components/Charity/CreateStoryForm';
import StoryFeed from './pages/StoriesFeed';
import CharityDonations from './components/Charity/CharityDonations';
import HiddenAdminLogin from './components/Admin/HiddenAdminLogin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <Router>
        <Navbar/>
        <HiddenAdminLogin />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register/donor" element={<RegisterForm role='donor' />} />
          <Route path="/register/charity" element={<RegisterForm role='charity' />} />
          <Route path="/login/donor" element={<LoginForm role='donor' />} />
          <Route path="/login/charity" element={<LoginForm role='charity' />} />
          <Route path="/donors/charities" element={<CharityList />} />
          <Route path="/charities/:id" element={<CharityDescription />} />
          <Route path="/donate/:id" element={<DonationForm />} />
          <Route path="/donors/dashboard/:donorId" element={<DonorDashboard />} />
          <Route path="/donors/history" element={<DonationHistory />} />
          {/* <Route path="/donor/profile" element={<DonorProfileForm />} /> */}
          <Route path="/donors/profile/update" element={<Updateprofile />} />
          <Route path="/apply" element={<CharityApplicationForm />} />
          <Route path="/charity/dashboard/:id" element={<CharityDashboard />} />
          <Route path="/charity/:id/beneficiaries" element={<BeneficiariesList />} />
          <Route path="/charity/:id/inventory" element={<InventoryList />} />
          <Route path="/charity/profile" element={<CharityProfileForm />} />
          <Route path='/charity/stories' element={<CreateStoryForm/>}/>
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/search-charities" element={<SearchCharity />} />
          <Route path="/donations/:donationId/update-recurring" element={<UpdateRecurringStatus />} />
          <Route path="/donors/recurring-donations" element={<RecurringDonations />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
       
          <Route path='/charity/stories/feed' element={<StoryFeed/>}></Route>
          <Route path="/charity/:charityId/donations" element={<CharityDonations />} />

       
        </Routes>
      </Router>
     </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
