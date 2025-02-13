import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import MyNav from './MyNav'
function Layout() {
    return (
        <div>
            {/* <Navbar /> */}
            {/* <MyNav /> */}
            <Outlet />
            {/* <Footer /> */}
        </div>
    )
}

export default Layout
