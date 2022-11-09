import React, { createContext, useState } from 'react'

import { BrowserRouter, Route, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import cartSession from '../utils/cartSession'

export const LoadQuantityCart  = createContext();

const Layout = (props) => {
    const [quantityInCart, setQuantityInCart] = useState((cartSession.getCart())?cartSession.getCart().length:0)

    
    return (
        <LoadQuantityCart.Provider value={setQuantityInCart}>
            <Header quantityInCart={quantityInCart}/>
            <div className="container">
                <div className="main">
                    {props.children}
                </div>
            </div>
            <Footer/>                    
        </LoadQuantityCart.Provider>
    )
}

export default Layout
