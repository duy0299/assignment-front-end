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
import Checkout from '../pages/Checkout'
import LayoutAd from '../pages/admin/LayoutAd'
import ListUserAd from '../pages/admin/ListUserAd'
import ListModelAd from '../pages/admin/ListModelAd'
import ListSizeAd from '../pages/admin/ListSizeAd'
import ListCategoriesAd from '../pages/admin/ListCategoriesAd'
import ListOrderAd from '../pages/admin/ListOrderAd'
import ListRatingAd from '../pages/admin/ListRatingAd'
import ListProductAd from '../pages/admin/ListProductAd'
import ListFeedbackAd from '../pages/admin/ListFeedbackAd'
import AddModelAd from '../pages/admin/AddModelAd'

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


                <Route path='/admin/' element={<LayoutAd/>} ></Route>
                <Route path='/admin/users/list/:page'  element={<LayoutAd><ListUserAd/></LayoutAd>}/>
                <Route path='/admin/models/list/:page'  element={<LayoutAd><ListModelAd/></LayoutAd>}/>
                <Route path='/admin/products/list/:page'  element={<LayoutAd><ListProductAd/></LayoutAd>}/>
                <Route path='/admin/sizes/list'  element={<LayoutAd><ListSizeAd/></LayoutAd>}/>
                <Route path='/admin/categories/list'  element={<LayoutAd><ListCategoriesAd/></LayoutAd>}/>
                <Route path='/admin/orders/list/:page'  element={<LayoutAd><ListOrderAd/></LayoutAd>}/>
                <Route path='/admin/ratings/list/:page'  element={<LayoutAd><ListRatingAd/></LayoutAd>}/>
                <Route path='/admin/feedback/list/:page'  element={<LayoutAd><ListFeedbackAd/></LayoutAd>}/>
                <Route path='/admin/model/add'  element={<LayoutAd><AddModelAd/></LayoutAd>}/>
                

                
            </Routes>
            
        </BrowserRouter>
    )
}

export default PageRouter
