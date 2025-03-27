import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Main from './components/pages/Home/Main';
import Services from './components/pages/Listing/Services';
import ServiceListing from './components/pages/Listing/ServiceListing.tsx';
import BrandsInIndia from './components/pages/BrandsInIndia';
import HospitalDetailsPage from './components/pages/HospitalDetails/HospitalDetailsPage';
import ServiceDetailsPage from './components/pages/ServicesDetails/ServiceDetailsPage';
import DashboardLayout from './components/pages/Dashboard/DashboardLayout';
import HospitalForm from './components/pages/Dashboard/HospitalForm';
import ClinicForm from './components/pages/Dashboard/ClinicForm';
import BankForm from './components/pages/Dashboard/BankForm';
import HomecareForm from './components/pages/Dashboard/HomecareForm';
import TransportForm from './components/pages/Dashboard/TransportForm';
import OrthoticsForm from './components/pages/Dashboard/OrthoticsForm';
import DiagnosticsForm from './components/pages/Dashboard/DiagnoticsForm';
import ListingTable from './components/pages/Dashboard/ListingTable';
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

import Contact from './components/pages/Contact';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import ContentPolicy from './components/pages/ContentPolicy';
import AboutUs from './components/pages/AboutUs';
import TermsAndConditions from './components/pages/TermsAndConditions';

function App() {


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="services/" element={<Services />} />
          <Route path="listing" element={<ServiceListing />} />
          <Route path="/dashboard" element={<DashboardLayout />} >
            <Route index path='/dashboard/hospital/add' element={<HospitalForm />} />
            <Route path='/dashboard/clinic/add' element={<ClinicForm />} />
            <Route path='/dashboard/bank/add' element={<BankForm />} />
            <Route path='/dashboard/homecare/add' element={<HomecareForm />} />
            <Route path='/dashboard/transport/add' element={<TransportForm />} />
            <Route path='/dashboard/op/add' element={<OrthoticsForm />} />
            <Route path='/dashboard/diagnostics/add' element={<DiagnosticsForm />} />

            <Route path='/dashboard/:type/all' element={<ListingTable />} />




          </Route>
          <Route path="brands-in-india" element={<BrandsInIndia />} />
          <Route path=":type/:id" element={<HospitalDetailsPage />} />
          <Route path="/services/:type/:id" element={<ServiceDetailsPage />} />

  

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

          <Route path='/contact-us' element={<Contact />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/content-policy' element={<ContentPolicy />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

