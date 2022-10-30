import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
// import ProductViewModal from './ProductViewModal'

import Routes from '../routes/Routes'

const Layout = () => {
    return (
        <BrowserRouter>
            <Route render={props => (
                <div>
                    <Header {...props}/>
                    <div className="container">
                        <div className="main">
                            {/* tùy trang do route quyết định*/}
                            <Routes/>
                        </div>
                    </div>
                    <Footer/>
                    {/* <ProductViewModal/> */}
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
