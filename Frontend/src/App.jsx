import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNav from './compoenets/MyNav'
import Carousel from './compoenets/Carousel';
import Home1 from './compoenets/Home1';
import Footer from './compoenets/Footer';
import Services from './compoenets/Services/Services';
import Layout from './compoenets/Layout';
import Home from './compoenets/Home';
import ServiceListing from './compoenets/Services/ServiceListing';
import NewServiceListing from './compoenets/Services/NewServiceListing';





function App() {

  return (
    <>
      {/* <MyNav/>
    <Carousel/>
    <Home1/>
    <Footer/>
    <Services/> */}
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ServiceListing" element={<ServiceListing />}>
              {/* <Route path="service/:id" element={<Services />} /> */}
            </Route>
            <Route path="new-service-listing" element={<NewServiceListing />} />
            <Route path="services/" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>









    </>
  )
}

export default App
