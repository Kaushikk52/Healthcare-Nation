import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import MyNav from './MyNav'
import Navbar2 from './Navbar2'
function Layout() {
    return (
        <div>
            {/* <Navbar /> */}
            {/* <MyNav /> */}
            <Navbar2/>
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Layout
