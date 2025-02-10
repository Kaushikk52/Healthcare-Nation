import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import Services from './components/Services';
import ServiceListing from './pages/ServiceListing';
import BrandsInIndia from './pages/BrandsInIndia';
import HospitalDetailsPage from './pages/HospitalDetailsPage';





function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/service-listing" element={<ServiceListing />} />
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

