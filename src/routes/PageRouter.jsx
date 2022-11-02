import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home     from '../pages/Home'
import Catalog  from '../pages/Catalog'
import Cart     from '../pages/Cart'
import Product  from '../pages/Product'
import Layout from '../pages/Layout'

const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Layout><Home/></Layout>}/>
                <Route path='/home' exact element={<Layout><Home/></Layout>}/>
                <Route path='/product/:id' element={<Layout><Product/></Layout>}/>
                {/* <Route path='/catalog' component={Catalog}/> */}
                {/* <Route path='/cart' component={Cart}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export default PageRouter
