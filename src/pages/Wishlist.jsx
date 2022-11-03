import React, { useCallback, useState, useEffect, useRef } from 'react'
import swal from 'sweetalert'

import Helmet from '../components/Helmet'

import productModelService  from '../service/productModelService'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import userService from '../service/userService'


const Catalog = () => {
    const initFilter = {
        category: [],
        size: []
    }
    const counterPageRef = useRef(null)
    const [products, setProducts] = useState(undefined)

    const  history = useLocation();
    const navigate = useNavigate();

    const loadListProduct = useCallback(
        () => {
            userService.getWithToken()
                .then(function (response) {
                    console.log(response.data);
                    let result = new Array();
                    for (const i of response.data.result.listWishlists) {
                        result.push(i.model);
                    }
                    setProducts(result)
                })
                .catch(function (error) {
                    console.log(error);
                    return null
                });
        },
        []
    )

   



    
    useEffect(() => {
        loadListProduct()
    }, []);

   
    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')
    

    return (
        <Helmet title="Danh sách yêu thích">
            <div className="catalog">
                <div className="catalog__content">
                     <Grid 
                        col={6}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        
                        {
                           (products)? products.map((item, index)=>(
                                <ProductCard
                                    product={item}
                                    key={index}
                                />
                            )):null
                        }
                    </Grid>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
