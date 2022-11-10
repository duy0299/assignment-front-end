import React, { createContext, useCallback, useEffect, useState } from 'react'

import { BrowserRouter, Route, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import cartSession from '../utils/cartSession'
import userService from '../service/userService'
import swalErrorAPI from '../utils/swalErrorAPI'

export const LoadLayout  = createContext();

const Layout = (props) => {
    const [quantityInCart, setQuantityInCart] = useState((cartSession.getCart())?cartSession.getCart().length:0)
    
    const [user, setUser] = useState(undefined);
    const LoadUser = ()=>{
        userService.getWithToken()
        .then((response)=>{
            setUser(response.data.result);
            console.log(response.data.result);
        })
        .catch((error)=>{
        })
    }

    useEffect(() => {
        LoadUser();
    }, []);
    
    return (
        <LoadLayout.Provider value={{setQuantityInCart:setQuantityInCart, reloadUser:LoadUser}}>
            <Header quantityInCart={quantityInCart} user={user}/>
            <div className="container">
                <div className="main">
                    {props.children}
                </div>
            </div>
            <Footer/>                    
        </LoadLayout.Provider>
    )
}

export default Layout
