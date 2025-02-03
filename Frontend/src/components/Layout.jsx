import React from 'react'
import { Outlet } from 'react-router-dom'
import MyNav from './MyNav'
import Footer from './Footer'
function Layout() {
    return (
        <div>
            <MyNav/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout
