import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Main from './components/pages/Home/Main';
import Services from './components/pages/Listing/Services';
import ServiceListing from './components/pages/Listing/ServiceListing';
import BrandsInIndia from './components/pages/BrandsInIndia';
import HospitalDetailsPage from './components/pages/HospitalDetails/HospitalDetailsPage';
import ClinicDetailsPage from './components/pages/ClinicDetails/ClinicDetailsPage';
import DashboardLayout from './components/pages/Dashboard/DashboardLayout';
import HospitalForm from './components/pages/Dashboard/HospitalForm';
import ClinicForm from './components/pages/Dashboard/ClinicForm';
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
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

