import React,  { useCallback, useEffect, useRef, useState } from 'react'

import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import ProductCard from '../components/ProductCard'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import ProductView from '../components/ProductView'
import productModelService  from '../service/productModelService'
import FormReview from '../components/FormReview'
import { useParams } from 'react-router-dom'



const Product = props => {
    const [productModel, setProductModel] = useState(undefined);
    const [mostPopularProducts, setMostPopularProducts] = useState(undefined);
   
    // const [loading, setLoading] = useState(false);
    const params = useParams();
    const loadProductModel = useCallback(
        () => {
            productModelService.getById(params.id)
            .then(function (response) {
                setProductModel(response.data.result)
            })
            .catch(function (error) {
                console.log(error.message);
                return null
            });
        },
        [params.id]
    )
    const loadMostPopularProducts = useCallback(
        () => {
            productModelService.getMostPopularProduct()
            .then(function (response) {
                setMostPopularProducts(response.data.result)
            })
            .catch(function (error) {
                console.log(error.message);
                return null
            });
        },
        [productModel]
    )
    const loadAfterRating = () => {
            loadProductModel();
            loadMostPopularProducts();
        }


    useEffect(() => {
        loadProductModel();
        loadMostPopularProducts();
    }, []);    

    useEffect(() => {
        window.scrollTo(0,0)
        loadMostPopularProducts();
        loadProductModel()
    }, [loadProductModel])




    

    return (
        <Helmet title= {(productModel !== undefined)?productModel.name:'không tìm thấy sản phẩm'}>
            <Section>
                <SectionBody>
                    {(productModel !== undefined)?<ProductView productModel={productModel}/>:<h3>Không tìm thấy sản phẩm</h3>}
                </SectionBody>
            </Section>
            <Section>
                <SectionBody>
                    {(productModel)?<FormReview productModelId={productModel.id}  loadAfterRating={loadAfterRating} listRating={productModel.listRating} />:null}
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={8}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            (mostPopularProducts)? mostPopularProducts.map((item, index)=>(
                                <ProductCard
                                    product={item}
                                    key={index}
                                />
                            )):null
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
