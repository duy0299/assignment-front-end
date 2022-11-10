import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Box, Pagination, Stack, TextField, Typography } from '@mui/material';
import swal from 'sweetalert'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'
import Button from '../components/Button'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import productModelService  from '../service/productModelService'
import categoriesService from '../service/categoriesService'
import sizeService from '../service/sizeService'

const Catalog = () => {
    const initFilter = {
        size: []
    }
    const  history = useLocation();
    const navigate = useNavigate();
    const counterPageRef = useRef(null)
    const params = useParams();

    const [currentPage, setCurrentPage] = useState(params.page);
    const [products, setProducts] = useState(undefined)
    const [categories, setCategories] = useState(undefined)
    const [sizes, setSizes] = useState(undefined)
    const [filter, setFilter] = useState(initFilter)
    const [totalPage, setTotalPage] = useState(1)
    const [priceTo, setPriceTo] = useState(0)
    const [priceFrom, setPriceFrom] = useState(0)

    

    const loadListProduct = useCallback(
        () => {
            if(!Number.isNaN(params.page)){
                if(params.id === undefined && params.name === undefined ){
                    productModelService.getAllBySatatus(params.page)
                    .then(function (response) {
                        console.log(response.data);
                        setProducts(response.data.result)
                        setTotalPage(response.data.totalPage)
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
                }else if(params.id !== undefined){
                    productModelService.getByCategories(params.id, params.page)
                    .then(function (response) {
                        setProducts(response.data.result)
                        setTotalPage(response.data.totalPage)
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
                }else if(params.name !== undefined){
                    console.log(params.name);
                    productModelService.search(params.name, params.page)
                    .then(function (response) {
                        setProducts(response.data.result)
                        setTotalPage(response.data.totalPage)
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
                }
            }
        },
        [params]
    )
    const loadListCategories = useCallback(
        () => {
            categoriesService
                .getAll()
                .then(function (response) {
                    let result = new Array();
                    for (const data of response.data.result) {
                        if(data.parentCategoriesId === null){
                            result.push(data);
                        }
                    }
                    console.log(result);
                    setCategories(result)
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
        []
    )
    const loadListSizes = useCallback(
        () => {
            sizeService
                .getAll()
                .then(function (response) {
                    setSizes(response.data.result)
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
        []
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

    const toggleTab = useCallback(
        (e) => {
            let list =  document.getElementsByClassName("_titleCategories");
            for (const i of list) {
               i.classList.remove("_choose");
            }
            e.target.classList.add("_choose")
        },
        [],
    )
    
    useEffect(() => {
        loadListProduct();
    }, [params]);

    useEffect(() => {
        loadListCategories();
        loadListSizes();
    }, []);

    useEffect(() => {
        updateProducts()
    }, [priceTo, priceFrom])

    const filterRef = useRef(null)
    const showHideFilter = () => filterRef.current.classList.toggle('active')

    if(Number.isNaN(params.page)){
        return null;
    }
    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter _catalog__filterLeft" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Bộ lọc
                        </div>
                        <div className="catalog__filter__widget__content">
                            <h2>Giá</h2>
                        <Box sx={{ flexGrow: 1, marginTop:3,  '& .MuiTextField-root': { m: 1, width: '80%' } }}>
                            <TextField
                                fullWidth 
                                defaultValue={0}
                                type={'number'}
                                name="priceFrom"
                                label="Từ"
                            />
                                <TextField
                                fullWidth 
                                defaultValue={0}
                                type={'number'}
                                name="priceTo"
                                label="Đến"
                            />
                        </Box>
                            
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            <nav className='animated _bounceInDown'>
                                <ul>
                                    {
                                        (categories)?categories.map((item, index)=>{
                                            if(item.listChildren.length==0){
                                                return (
                                                    <Accordion TransitionProps={{ unmountOnExit: false }}>
                                                        <AccordionSummary
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Link to={`/catalog/category/${item.id}/page/1`}>
                                                                <Typography >
                                                                    <span onClick={toggleTab} className='_titleCategories'>{item.name}</span> 
                                                                </Typography>
                                                            </Link>
                                                        </AccordionSummary>
                                                    </Accordion>
                                                )
                                            }else{
                                                return (
                                                    <Accordion>
                                                        {/* parent */}
                                                        <AccordionSummary
                                                            expandIcon={<i className='bx bx-chevron-down _iconBase'/>}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                        <Link to={`/catalog/category/${item.id}/page/1`}>
                                                                <Typography >
                                                                    <span onClick={toggleTab} className='_titleCategories'>{item.name}</span> 
                                                                </Typography>
                                                            </Link>
                                                        </AccordionSummary>
                                                        {/* children */}
                                                        {
                                                            item.listChildren.map((item, index)=>(
                                                                <AccordionDetails>
                                                                    <Link to={`/catalog/category/${item.id}/page/1`}>
                                                                        <Typography >
                                                                            <span onClick={toggleTab} className='_titleCategories'>{item.name}</span> 
                                                                        </Typography>
                                                                    </Link>
                                                                </AccordionDetails>
                                                            ))
                                                        }
                                                    </Accordion>
                                                )
                                            }
                                        }): null
                                    }
                                </ul>
                            </nav>
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
                    {
                        (products)?
                        <Grid 
                            col={4}
                            mdCol={2}
                            smCol={1}
                            gap={20}
                        >
                            {
                                (
                                    products.length!==0)?  
                                        products.map((item, index)=>(
                                            <ProductCard
                                                product={item}
                                                key={index}
                                                reLoad={loadListProduct}
                                            />
                                ))
                                :
                                <div className='text-list-empty'>
                                    <p>Hiện Tại Chưa Có Sản Phẩm</p>
                                </div>
                            }
                        </Grid>
                        :null
                    }
                    <div className='_pageCounter' ref={counterPageRef}>
                        <Stack spacing={2}>
                            <Pagination  count={totalPage} color="primary" 
                                defaultValue={currentPage} 
                                onChange={(e, value)=>{
                                    let url = history.pathname;
                                    url = url.replace("page/"+params.page, "page/"+value)
                                    
                                    // history.pathname = url
                                    // params.page = value;
                                    // setCurrentPage(value)
                                    // console.log(url);
                                    navigate(url);
                                }
                            }
                            />
                        </Stack>                        
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
