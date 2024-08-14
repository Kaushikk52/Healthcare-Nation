import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import MyNav from './compoenets/MyNav'
import  Carousel  from './compoenets/Carousel';
import Home1 from './compoenets/Home1';
import Footer from './compoenets/Footer';
import Services from './compoenets/Services/Services';
import Layout from './compoenets/Layout';
import Home from './compoenets/Home';





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
  <Route path='/' element={<Layout/>}>
  <Route path='/' element={<Home/>}/>
  <Route path='/services' element={<Services/>}/>
 
  </Route>

</Routes>
</BrowserRouter>




  
  
  


    </>
  )
}

export default App
