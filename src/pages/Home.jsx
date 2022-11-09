import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import Helmet     from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import PolicyCard from '../components/PolicyCard'
import Grid       from '../components/Grid'
import ProductCard from '../components/ProductCard'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'

import banner from '../assets/images/banner/banner3.jpg'
import productModelService  from '../service/productModelService'

const Home = () => {
    const [newModel, setNewModel] = useState(null);
    const [mostPopularProducts, setMostPopularProducts] = useState((null));
    // const [loading, setLoading] = useState(false);
    

    const loadNewProduct = useCallback(
        () => {
            productModelService.getNewProduct()
            .then(function (response) {
                setNewModel(response.data.result)
            })
            .catch(function (error) {
                console.log(error.message);
                return null
            });
        },
        []
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
        []
    )
    const load = useCallback(() => {
            loadMostPopularProducts();
            loadNewProduct();
        },[])



    
    useEffect(() => {
        load()
    }, []);  
 
    
    

    return (
        <Helmet title='Trang chủ'>
            {/* hero slider */}
            <HeroSlider 
                data={heroSliderData}
                control={true}
                auto={true}
                timeOut={3000}
               />

            <Section>
                <SectionTitle>
                    Sản phẩm phổ biến
                </SectionTitle>
                <SectionBody>
                <Grid 
                    col={5}
                    mdCol={2}
                    smCol={1}
                    gap={20}
                >
                    {
                        (mostPopularProducts)? mostPopularProducts.map((item, index)=>(
                            <ProductCard
                                product={item}
                                key={index}
                                reLoad={load}
                            />
                        )):null
                    }
                </Grid>
                </SectionBody>
            </Section>

            {/* Banner */}
            <Section>
                <SectionBody>
                    <Link to='/catalog'>
                        <img src={banner} alt='banner'/>
                    </Link>
                </SectionBody>
            </Section>

            {/* new arrival */}
            <Section>
                <SectionTitle>
                    Sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid 
                        col={5}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                           (newModel)? newModel.map((item, index)=>(
                                <ProductCard
                                    product={item}
                                    key={index}
                                    reLoad={load}
                                />
                            )):null
                        }
                    </Grid>
                </SectionBody>
            </Section>

               {/* list policy */}
               <Section >
                <SectionBody>
                    <Grid 
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}>
{
                        policy.map((item, index)=>(
                            <Link to={'/policy'} key={index}>
                                <PolicyCard 
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                />
                            </Link>
                        ))
                    }
                    </Grid>
                </SectionBody>
            </Section>

        </Helmet>
    )
}

export default Home
