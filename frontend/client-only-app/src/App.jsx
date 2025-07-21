import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CharityDescription from './components/Donor/CharityDescription';
import DonationForm from './components/Donor/DonationForm';
import DonorDashboard from './components/Donor/DonorDashboard';
import CharityList from './components/Donor/CharityList';
import DonationHistory from './components/Donor/DonationHistory';
import DonorProfileForm from './components/Donor/DonorProfileForm';
import Updateprofile from './components/Donor/Updateprofile';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharityList />} />
        <Route path="/charities/:id" element={<CharityDescription />} />
        <Route path="/donate/:id" element={<DonationForm />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/history" element={<DonationHistory />} />
        <Route path="/donor/profile" element={<DonorProfileForm />} />
        <Route path="/donor/profile/update" element={<Updateprofile />} />
      </Routes>
    </Router>
  );
}

export default App;
