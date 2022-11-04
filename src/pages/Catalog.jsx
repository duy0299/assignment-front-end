import React, { useCallback, useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import swal from 'sweetalert'

import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'

import Button from '../components/Button'

import productModelService  from '../service/productModelService'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

import categoriesService from '../service/categoriesService'
import sizeService from '../service/sizeService'

const Catalog = () => {
    const  history = useLocation();
    const navigate = useNavigate();
    const initFilter = {
        size: []
    }
    const counterPageRef = useRef(null)
    const params = useParams();
    const [products, setProducts] = useState(undefined)
    const [categories, setCategories] = useState(undefined)
    const [sizes, setSizes] = useState(undefined)
    const [filter, setFilter] = useState(initFilter)
    const [totalPage, setTotalPage] = useState(1)
    const [arrTotalPage, setArrTotalPage] = useState(new Array(1))

    

    const loadListProduct = useCallback(
        () => {
            if(!Number.isNaN(params.page)){
                if(params.id === undefined){
                    productModelService.getAllByPage(params.page)
                    .then(function (response) {
                        console.log(response.data);
                        setProducts(response.data.result)
                        setTotalPage(response.data.totalPage)
                        setArrTotalPage((e)=>{
                            e = new Array();
                            console.log(response.data);
                            for (let i = 1; i < response.data.totalPage+1; i++) {
                                e.push(i)
                            }
                            return e;
                        })
                        
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
                }else{
                    productModelService.getByCategories(params.id,params.page)
                    .then(function (response) {
                        setProducts(response.data.result)
                        setTotalPage(response.data.totalPage)
                        setArrTotalPage((e)=>{
                            e = [];
                            for (let i = 1; i < response.data.totalPage+1; i++) {
                                e.push(i)
                            }
                            return e;
                        })
                        
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
    // const changePageCounter = useCallback(
    //     ,
    //     [],
    // )
    const nextPageCounter = useCallback(
        (e) => {
            console.log({historyPathname:history.pathname, totalPage, paramsPage:params.page});
            let url = history.pathname;
            let paramPage = Number.parseInt(params.page) +1
            url = url.replace("/"+params.page, "/"+paramPage)
            if(Number.parseInt(totalPage) <= Number.parseInt(params.page)){
                swal("Chú ý", "bạn đang ở trang cuối", "warning");
                return 0;
            }
            history.pathname = url
            params.page = paramPage;
            console.log({historyPathname:history.pathname, totalPage, paramsPage:params.page});
            navigate(url);
        },
        [],
    )
    const prePageCounter = useCallback(
        (e) => {
            console.log({historyPathname:history.pathname, totalPage, paramsPage:params.page});
            let url = history.pathname;
            let paramPage = Number.parseInt(params.page) -1
            url = url.replace("/"+params.page, "/"+paramPage)
            
            if(1 === Number.parseInt(params.page)){
                swal("Chú ý", "bạn đang ở trang đầu", "warning");
                return null;
            }
            history.pathname = url
            params.page = paramPage;
            console.log({historyPathname:history.pathname, totalPage, paramsPage:params.page});
            navigate(url);
        },
        [],
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
                                                            <Link to={`/catalog/category/${item.id}/1`}>
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
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                        <Link to={`/catalog/category/${item.id}/1`}>
                                                                <Typography >
                                                                    <span onClick={toggleTab} className='_titleCategories'>{item.name}</span> 
                                                                </Typography>
                                                            </Link>
                                                        </AccordionSummary>
                                                        {/* children */}
                                                        {
                                                            item.listChildren.map((item, index)=>(
                                                                <AccordionDetails>
                                                                    <Link to={`/catalog/category/${item.id}/1`}>
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
                        <div className="catalog__filter__widget__title">
                            kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                (sizes)?sizes.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onchange={(input) => filterSelect("SIZE", input.checked, item)}
                                            checked={filter.size.includes(item.id)}
                                        />
                                    </div>
                                )):null
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
                    {
                        (products)?
                        <Grid 
                            col={4}
                            mdCol={2}
                            smCol={1}
                            gap={20}
                        >
                            {
                                (products.length!==0)?  
                                    products.map((item, index)=>(
                                        <ProductCard
                                            product={item}
                                            key={index}
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
                        <a href="javascript:void(0)">
                            <div className='_pageCounter__pre' name="pre" onClick={prePageCounter} >
                                
                                <i className='bx bx-chevron-left' ></i>
                            </div>
                        </a>
                        {
                            (arrTotalPage !== null)?arrTotalPage.map((item, index)=>(
                                <a href="javascript:void(0)">
                                    <div className={`_pageCounter__${(item==params.page)?"active-page":"page"}`}  
                                        onClick={
                                            (e) => {
                                                
                                                let url = history.pathname;
                                                console.log(history.pathname);
                                                console.log(params.page);
                                                console.log(item);
                                                url = url.replace("/"+params.page, "/"+item)
                                                history.pathname = url
                                                params.page = item;
                                                navigate(url);
                                        }}
                                    >
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
