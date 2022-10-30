import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Helmet     from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import PolicyCard from '../components/PolicyCard'
import Grid       from '../components/Grid'
import ProductCard from '../components/ProductCard'
import Section, { SectionTitle, SectionBody } from '../components/Section'

import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import productData from '../assets/fake-data/products'

import banner from '../assets/images/banner/banner3.jpg'

const Home = () => {

    console.log(heroSliderData);
    return (
        <Helmet title='Trang chủ'>
            {/* hero slider */}
            <HeroSlider 
                data={heroSliderData}
                control={true}
                auto={false}
                timeOut={4000}
               />
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

            {/* list Best selling section */}
            <Section>
                <SectionTitle>
                    Top sản phẩm bán chạy trong tuần
                </SectionTitle>
                <SectionBody>
                <Grid 
                    col={5}
                    mdCol={2}
                    smCol={1}
                    gap={20}
                >
                    {
                        productData.getProducts(5).map((item, index)=>(
                            <ProductCard
                                key={index}
                                img01= {item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))
                    }
                </Grid>
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
                        productData.getProducts(10).map((item, index)=>(
                            <ProductCard
                                key={index}
                                img01= {item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))
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

            {/*  */}
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
                        productData.getProducts(15).map((item, index)=>(
                            <ProductCard
                                key={index}
                                img01= {item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={item.price}
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

export default Home
