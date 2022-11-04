import React,  { useCallback, useEffect, useRef, useState } from 'react'

import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import ProductCard from '../components/ProductCard'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import ProductView from '../components/ProductView'
import productModelService  from '../service/productModelService'
import FormReview from '../components/FormReview'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'



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
                if(error.response){
                    if(error.response.data.message == null){
                        swal("Lỗi", error.response.data.result, "error");
                    }else{
                        swal("Lỗi", error.response.data.message, "error");
                    }
                }else{
                    swal("Lỗi", error.message, "error");
                }
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
                if(error.response.data){
                    if(error.response.data.message == null){
                        swal("Lỗi", error.response.data.result, "error");
                    }else{
                        swal("Lỗi", error.response.data.message, "error");
                    }
                }else{
                    swal("Lỗi", error.message, "error");
                }
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
                    Những Mẫu phổ biến
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
