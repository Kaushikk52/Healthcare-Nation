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
import DiagnosticCenters from './components/pages/DiagnosticCenters';
import AlternativeMedicine from './components/pages/AlternativeMedicine';
import OnlineServices from './components/pages/OnlineServices';
import PublicSectorCorporates from './components/pages/PublicSectorCorporates';
import MoreServices from './components/pages/MoreServices';
import HealthConcern from './components/pages/HealthConcern';
import PopularHospitals from './components/pages/PopularHospitals';
import HealthInurance from './components/pages/HealthInsurance';
import TPA from './components/pages/TPA';
import HealthcareServices from './components/pages/HealthcareServices';
import ScrollToTop from './components/ScrollToTop';
function App() {


  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="services/" element={<Services />} />
          <Route path="listing" element={<ServiceListing />} />
          <Route path="brands-in-india" element={<BrandsInIndia />} />
          <Route path=":type/:id" element={<HospitalDetailsPage />} />
          <Route path="clinic-details-page" element={<ClinicDetailsPage />} />

          <Route path="/dashboard" element={<DashboardLayout />} >
            <Route path='/dashboard/hospital' element={<HospitalForm />} />
            <Route path='/dashboard/clinic' element={<ClinicForm />} />
          </Route>

          <Route path='/healthcare-services' element={< HealthcareServices />} />
          <Route path='/diagnostic-centers' element={< DiagnosticCenters />} />
          <Route path='/alternative-medicines' element={< AlternativeMedicine />} />
          <Route path='/online-healthcare-services' element={< OnlineServices />} />
          <Route path='/public-sector-corporates' element={< PublicSectorCorporates />} />
          <Route path='/more-services' element={< MoreServices />} />
          <Route path='/health-concern' element={< HealthConcern />} />
          <Route path='/popular-hospitals' element={< PopularHospitals />} />
          <Route path='/health-insurance' element={< HealthInurance />} />
          <Route path='/tpa' element={< TPA />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

