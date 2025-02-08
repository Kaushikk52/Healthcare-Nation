import React from 'react'
import { Outlet } from 'react-router-dom'
import MyNav from './MyNav'
import Footer from './Footer'
import Navbar from './Navbar'
function Layout() {
    return (
        <div>
            {/* <Navbar /> */}
            {/* <MyNav/> */}
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout
