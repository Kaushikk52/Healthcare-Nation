import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import Services from './components/Services';
import ServiceListing from './pages/ServiceListing';
import BrandsInIndia from './pages/BrandsInIndia';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import ClinicDetailsPage from './pages/ClinicDetailsPage';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import HospitalForm from './pages/Dashboard/HospitalForm';
import ClinicForm from './pages/Dashboard/ClinicForm';
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/service-listing" element={<ServiceListing />} />
            <Route path="services/" element={<Services />} />
            <Route path="brands-in-india" element={<BrandsInIndia />} />
            <Route path="hospital-details-page" element={<HospitalDetailsPage />} />
            <Route path="clinic-details-page" element={<ClinicDetailsPage />} />
            <Route path="/dashboard" element={<DashboardLayout />} >
              <Route path='/dashboard/hospital' element={<HospitalForm/>} />
              <Route path='/dashboard/clinic' element={<ClinicForm/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;

