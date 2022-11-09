import React, { useCallback, useRef, useState } from 'react'
import swal from 'sweetalert'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'
import formatVND from '../utils/formatVND'
import wishlistService from "../service/wishlistService";

import cookies from '../utils/cookies';
import { useEffect } from 'react';

const ProductCard = (props) => {
    
    const wishlistRef = useRef(null); 
    const id        = props.product.id       
    const img01     = props.product.listImages[0]
    const img02     = props.product.listImages[1]
    const name      = props.product.name     
    const priceTo   = props.product.priceTo  
    const priceFrom = props.product.priceFrom
    const priceRoot = props.product.priceRoot
    const [idWishlist, setIdWishlist] = useState(undefined);
    
    
    const addWishlist = (e)=>{
        wishlistService.insert(id)
                .then(function (response) {
                    props.reLoad();
                    swal (
                            {
                            title: "Thành  công",
                            icon: "success"
                        }
                    )
                })
                .catch(function (error) {
                    if(error.response.data.message == null){
                        swal("Lỗi", error.response.data.result, "error");
                    }else{
                        swal("Lỗi", error.response.data.message, "error");
                    }
                    
                    console.log(error);
                })
    }
    const removeWishlist = (e)=>{
        wishlistService.delete(idWishlist)
                .then(function (response) {
                    props.reLoad();
                    setIdWishlist(true)
                })
                .catch(function (error) {
                    if(error.response.data.message == null){
                        swal("Lỗi", error.response.data.result, "error");
                    }else{
                        swal("Lỗi", error.response.data.message, "error");
                    }
                    console.log(error);
                })
    }
    let ComponentPrice = (props) =>{
        if(props.priceFrom ===  props.priceTo){
            return (
                <div className="product-card__price">
                    {formatVND(numberWithCommas(props.priceRoot))}
                </div>
            )
        }else{
            return (
                <div className="product-card__price">
                    <span>
                        {formatVND(numberWithCommas(props.priceFrom))}
                    </span>
                    <span> - </span>
                    <span className="product-card__price">
                        {formatVND(numberWithCommas(props.priceTo))}
                    </span>
                </div>
            )

        }
    }

    useEffect(()=>{
        const user = (cookies.getUser()!==null)?cookies.getUser():"";
        const email = user.name
        let flat = true;
        for (const item of props.product.listWishlist ) {
            if (item.email === email) {
                setIdWishlist(item.id)
                flat = false;
            }
        }
        if(flat){
            setIdWishlist(undefined)
        }
    },[props])

    return (
        <div className="product-card" ref={wishlistRef}>
            <Link to={`/product/${id}`}>
                <div className="product-card__image">
                    <img src={img01} alt="avatar" />
                    <img src={img02} alt="avatar" />
                </div>
            </Link>
            <Link to={`/product/${id}`}>
                <h3 className="product-card__name">{name}</h3>
            </Link>
                <div className="product-card__price">
                    <ComponentPrice 
                        priceRoot={priceRoot} 
                        priceFrom={priceFrom} 
                        priceTo={priceTo}/>
                </div>
                <div className="product-card__price">
                    <Rating
                        name="Read only"
                        value={props.product.start}
                        readOnly
                    />
                    <span className="product-card__price__old">
                        <Link>
                            {(idWishlist)?<i className='bx bxs-heart' onClick={removeWishlist}></i>:<i className='bx bx-heart' onClick={addWishlist}></i>}
                        </Link>
                    </span>
                </div>
            
            <div className="product-card__btn">
                <Link to={`/product/${id}`}>
                    <Button
                        size="sm"    
                        icon="bx bx-cart"
                        animate={true}
                        // add to cart
                    >
                        Mua
                    </Button>
                </Link>
            </div>
        </div>
    )
}


// ProductCard.propTypes = {
//     product:         PropTypes.object.isRequired,
// }

export default ProductCard
