import React from 'react'

import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import ProductCard from '../components/ProductCard'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import productData from '../assets/fake-data/products'
import ProductView from '../components/ProductView'


const Product = props => {
    const product = productData.getProductBySlug(props.match.params.slug)
    const relatedProducts = productData.getProducts(8)
    
    
    return (
        <Helmet title= {(product !== undefined)?product.title:'không tìm thấy sản phẩm'}>
            <Section>
                <SectionBody>
                    {(product !== undefined)?<ProductView product={product}/>:<h3>Không tìm thấy sản phẩm</h3>}
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Khám phá thêm
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            relatedProducts.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />   
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
