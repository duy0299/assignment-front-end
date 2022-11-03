import React, { useCallback, useState, useEffect, useRef } from 'react'
import swal from 'sweetalert'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import category from '../assets/fake-data/category'
import size from '../assets/fake-data/product-size'
import Button from '../components/Button'
import InfinityList from '../components/InfinityList'

import productModelService  from '../service/productModelService'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import PageCounter from '../components/PageCounter'


const Catalog = () => {
    const initFilter = {
        category: [],
        size: []
    }
    const counterPageRef = useRef(null)
    const params = useParams();
    const [products, setProducts] = useState(undefined)
    const [filter, setFilter] = useState(initFilter)
    const [currentPage, setCurrentPage] = useState(params.page)
    const [totalPage, setTotalPage] = useState(1)
    const [arrTotalPage, setArrTotalPage] = useState(new Array(1))

    const  history = useLocation();
    const navigate = useNavigate();

    const loadListProduct = useCallback(
        () => {
            if(!Number.isNaN(params.page)){
                productModelService.getAllByPage(params.page)
                .then(function (response) {
                    console.log(response.data);
                    setProducts(response.data.result)
                    setTotalPage(response.data.totalPage)
                    setArrTotalPage((e)=>{
                        e = new Array();
                        for (let i = 1; i < response.data.totalPage+1; i++) {
                            e.push(i)
                            
                        }
                        return e;
                    })
                    
                })
                .catch(function (error) {
                    console.log(error.message);
                    return null
                });
            }
        },
        [params.page]
    )

    const filterSelect = (type, checked, item) => {
        // if (checked) {
        //     switch(type) {
        //         case "CATEGORY":
        //             setFilter({...filter, category: [...filter.category, item.categorySlug]})
        //             break
        //         case "SIZE":
        //             setFilter({...filter, size: [...filter.size, item.size]})
        //             break
        //         default:
        //     }
        // } else {
        //     switch(type) {
        //         case "CATEGORY":
        //             const newCategory = filter.category.filter(e => e !== item.categorySlug)
        //             setFilter({...filter, category: newCategory})
        //             break
        //         case "SIZE":
        //             const newSize = filter.size.filter(e => e !== item.size)
        //             setFilter({...filter, size: newSize})
        //             break
        //         default:
        //     }
        // }
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = products

            // if (filter.category.length > 0) {
            //     temp = temp.filter(e => filter.category.includes(e.categorySlug))
            // }
            // if (filter.size.length > 0) {
            //     temp = temp.filter(e => {
            //         const check = e.size.find(size => filter.size.includes(size))
            //         return check !== undefined
            //     })
            // }

            setProducts(temp)
        },
        [filter, products],
    )
    const changePageCounter = useCallback(
        (e) => {
           
            let value =e.target.outerText
            let url = history.pathname;
            url = url.replace("/"+params.page, "/"+value)
            history.pathname = url
            console.log( history.pathname );
            params.page = value;
            navigate(url);
        },
        [],
    )
    const nextPageCounter = useCallback(
        (e) => {
            
            let url = history.pathname;
            let paramPage = Number.parseInt(params.page) +1
            url = url.replace("/"+params.page, "/"+paramPage)
            if(totalPage <= params.page){
                swal("Chú ý", "bạn đang ở trang cuối", "warning");
                return 0;
            }
            history.pathname = url
            console.log( history.pathname );
            params.page = paramPage;
            navigate(url);
        },
        [],
    )
    const prePageCounter = useCallback(
        (e) => {
            let url = history.pathname;
            let paramPage = Number.parseInt(params.page) -1
            url = url.replace("/"+params.page, "/"+paramPage)
            if(0 == params.page){
                swal("Chú ý", "bạn đang ở trang đầu", "warning");
                return 0;
            }
            history.pathname = url
            console.log( history.pathname );
            params.page = paramPage;
            console.log();
            navigate(url);
        },
        [],
    )



    
    useEffect(() => {
        loadListProduct()
    }, [params]);

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')
    

    if(Number.isNaN(params.page)){
        return null;
    }
    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onchange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                size.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.display}
                                            onchange={(input) => filterSelect("SIZE", input.checked, item)}
                                            checked={filter.size.includes(item.size)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    {/* <InfinityList
                        data={products}
                    /> */}
                     <Grid 
                        col={4}
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
                    
                    <div className='_pageCounter' ref={counterPageRef}>
                        <a href="javascript:void(0)">
                            <div className='_pageCounter__pre' name="pre" onClick={prePageCounter} >
                                
                                <i className='bx bx-chevron-left' ></i>
                            </div>
                        </a>
                        {
                            (arrTotalPage !== null)?arrTotalPage.map((item, index)=>(
                                <a href="javascript:void(0)">
                                    <div className={`_pageCounter__${(item==params.page)?"active-page":"page"}`}  onClick={changePageCounter}>
                                        <p>{item}</p>
                                    </div>
                                </a>
                                
                            )): null
                        }
                        <a href="javascript:void(0)">
                            <div className='_pageCounter__next' name="next" onClick={nextPageCounter}>
                                <i className='bx bx-chevron-right'></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
