import React from 'react'

import { BrowserRouter, Route, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'


import PageRouter from '../routes/PageRouter'

const Layout = (props) => {
    
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="main">
                    {props.children}
                </div>
            </div>
            <Footer/>                    
        </div>
    )
}

export default Layout
