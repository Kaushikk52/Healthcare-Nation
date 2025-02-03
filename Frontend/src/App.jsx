import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Services from './components/Services/Services';
import Layout from './components/Layout';
import Home from './components/Home';
import ServiceListing from './components/Services/ServiceListing';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/listing" element={<ServiceListing />}> 
            </Route>
            <Route path="services/" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

