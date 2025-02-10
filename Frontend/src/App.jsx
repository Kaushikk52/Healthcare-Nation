import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import ServiceListing from './components/Services/ServiceListing';
import Services from './components/Services/Services';
import NewServiceListing from './components/Services/NewServiceListing';
import BrandsInIndia from './pages/BrandsInIndia';
import HospitalDetailsPage from './pages/HospitalDetailsPage';





function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/listing" element={<ServiceListing />}> 
            </Route>
            <Route path="new-service-listing" element={<NewServiceListing />} />
            <Route path="services/" element={<Services />} />
            <Route path="brands-in-india" element={<BrandsInIndia />} />
            <Route path="hospital-details-page" element={<HospitalDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

