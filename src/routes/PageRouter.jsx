import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home     from '../pages/Home'
import Catalog  from '../pages/Catalog'
import Cart     from '../pages/Cart'
import Product  from '../pages/Product'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Wishlist from '../pages/Wishlist'
import Checkout from '../pages/checkout'

const HomePage = <Layout><Home/></Layout>;
const ProductPage = <Layout><Product/></Layout>;
const RegisterPage = <Layout><Register/></Layout>;
const CatalogPage = <Layout><Catalog/></Layout>;
const WishlistPage = <Layout><Wishlist/></Layout>;
const CartPage = <Layout><Cart/></Layout>;
const CheckoutPage = <Layout><Checkout/></Layout>;

const PageRouter = () => {
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' exact element={HomePage}/>
                <Route path='/' exact element={HomePage}/>
                <Route path='/login' exact element={<Login/>}/>
                <Route path='/register' element={RegisterPage}/>
                <Route path='/checkout' element={CheckoutPage}/>
                <Route path='/product/:id' element={ProductPage}/>
                <Route path='/cart' element={CartPage}/>
                <Route path='/wishlist' element={WishlistPage}/>
                <Route path='/catalog/:page' element={CatalogPage}/>
                <Route path='/catalog/category/:id/:page' element={CatalogPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRouter
