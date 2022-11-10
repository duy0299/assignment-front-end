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
import MyAccount from '../pages/MyAccount'
import LayoutAd from '../pages/admin/LayoutAd'
import ListUserAd from '../pages/admin/ListUserAd'
import ListModelAd from '../pages/admin/model/ListModelAd'
import ListSizeAd from '../pages/admin/ListSizeAd'
import ListCategoriesAd from '../pages/admin/categories/ListCategoriesAd'
import ListOrderAd from '../pages/admin/ListOrderAd'
import ListRatingAd from '../pages/admin/ListRatingAd'
import ListProductAd from '../pages/admin/product/ListProductAd'
import ListFeedbackAd from '../pages/admin/ListFeedbackAd'
import AddModelAd from '../pages/admin/model/AddModelAd'
import EditModelAd from '../pages/admin/model/EditModelAd'
import AddCategoryAd from '../pages/admin/categories/AddCategoryAd'
import AddProductsAd from '../pages/admin/product/AddProductsAd'
import EditCategoryAd from '../pages/admin/categories/EditCategoryAd'

const HomePage = <Layout><Home/></Layout>;
const ProductPage = <Layout><Product/></Layout>;
const RegisterPage = <Layout><Register/></Layout>;
const CatalogPage = <Layout><Catalog/></Layout>;
const WishlistPage = <Layout><Wishlist/></Layout>;
const CartPage = <Layout><Cart/></Layout>;
const CheckoutPage = <Layout><Checkout/></Layout>;
const MyAccountPage = <Layout><MyAccount/></Layout>;

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
                <Route path='/my-account' element={MyAccountPage}/>
                <Route path='/catalog/page/:page' element={CatalogPage}/>
                <Route path='/catalog/search/:name/page/:page' element={CatalogPage}/>
                <Route path='/catalog/category/:id/page/:page' element={CatalogPage}/>


                <Route path='/admin/' element={<LayoutAd/>} ></Route>

                <Route path='/admin/sizes'  element={<LayoutAd><ListSizeAd/></LayoutAd>}/>
                <Route path='/admin/categories'  element={<LayoutAd><ListCategoriesAd/></LayoutAd>}/>
                <Route path='/admin/users/page/:page'  element={<LayoutAd><ListUserAd/></LayoutAd>}/>
                <Route path='/admin/models/page/:page'  element={<LayoutAd><ListModelAd/></LayoutAd>}/>
                <Route path='/admin/products/page/:page'  element={<LayoutAd><ListProductAd/></LayoutAd>}/>
                <Route path='/admin/orders/page/:page'  element={<LayoutAd><ListOrderAd/></LayoutAd>}/>
                <Route path='/admin/ratings/page/:page'  element={<LayoutAd><ListRatingAd/></LayoutAd>}/>
                <Route path='/admin/feedbacks/page/:page'  element={<LayoutAd><ListFeedbackAd/></LayoutAd>}/>

                {/* add */}
                <Route path='/admin/model'  element={<LayoutAd><AddModelAd/></LayoutAd>}/>
                <Route path='/admin/category'  element={<LayoutAd><AddCategoryAd/></LayoutAd>}/>
                <Route path='/admin/product'  element={<LayoutAd><AddProductsAd/></LayoutAd>}/>

                {/* edit */}
                <Route path='/admin/model/:id/info'  element={<LayoutAd><EditModelAd/></LayoutAd>}/>
                <Route path='/admin/category/:id/info'  element={<LayoutAd><EditCategoryAd/></LayoutAd>}/>
                

                
            </Routes>
            
        </BrowserRouter>
    )
}

export default PageRouter
