import React, { useState, useEffect, useCallback } from 'react'
import swal from 'sweetalert'
import PropTypes from 'prop-types'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'
import formatVND from '../utils/formatVND'
import cookies from '../utils/cookies';
import { Link } from 'react-router-dom'
import wishlistService from '../service/wishlistService'
import cartSession from '../utils/cartSession'

const user = (cookies.getUser()!==null)?cookies.getUser():"";


const ProductView = props => {
    let productModel = props.productModel
    
    // main image review
    const [previewImg, setPreviewImg] = useState(productModel.listImages[0])
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    // main product
    const [product, setProduct] = useState(undefined)
    const [quantity, setQuantity] = useState(1)
    
    let wishlist  = false;
    const email = user.name
    for (const item of productModel.listWishlist) {
        if (item.email === email) {
            wishlist = true;
        }
    }
    const addWishlist = useCallback((e)=>{
        wishlistService.insert(productModel.id)
                .then(function (response) {
                    console.log(response.data);
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
    })
    const removeWishlist = useCallback((e)=>{
        wishlistService.delete(productModel.id)
                .then(function (response) {
                    console.log(response.data);
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
    })
    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }
    
    const check = () => {
        if (product === undefined ||  product === null) {
            swal("chú ý", 'Bạn chưa chọn kích thước', "warning");
            return false
        }
        return true
    }

    const addToCart = useCallback(() => {
        console.log(quantity);
        console.log(product);
        
        if (check()) {
            let item = {
                productId: product.id,
                name: product.name,
                avatar: product.avatar,
                price: product.currentPrice,
                size: product.size.name,
                quantity: quantity
            }
            cartSession.addToCart(item, "default");
        }
    }, [quantity, product])

    const goToCart = () => {
        if (check()) {
            // let newItem = {
            //     slug: productModel.slug,
            //     size: size,
            //     price: productModel.price,
            //     quantity: quantity
            // }
            props.history.push('/cart')
        }
    }

    // useEffect
    useEffect(() => {
        setPreviewImg(productModel.listImages[0])
        setQuantity(1)
        setProduct(undefined)
    }, [productModel])

 

 


    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    {
                        productModel.listImages.map((item, index)=>(
                            <div className="product__images__list__item" onClick={() => setPreviewImg(item)}>
                                <img src={item} alt="images" />
                            </div>
                        ))
                    }
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: productModel.description}}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{productModel.name}</h1>
                <div className="product__info__item" key="r1">
                    <span className="product__info__item__price">
                        {(product!== undefined) ? 
                            <ComponentPrice priceRoot={productModel.priceRoot} 
                                priceFrom={productModel.priceFrom} 
                                priceTo={productModel.priceTo}
                                currentPrice={product.currentPrice}
                            />
                            : 
                            <ComponentPrice priceRoot={productModel.priceRoot} 
                                            priceFrom={productModel.priceFrom} 
                                            priceTo={productModel.priceTo}
                                            currentPrice={undefined}
                                            />}
                        
                    </span>
                </div>
                <div className="product__info__item"  key="r2">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            productModel.listProduct.map((item, index) => (
                                <div key={index} 
                                    className={`product__info__item__list__item 
                                    ${(((product!==undefined)?product.size.id:null) === item.size.id) ? 'active' : ''}`} 
                                    onClick={() => {
                                    setProduct(item)
                                    setPreviewImg(item.avatar)    
                                } }>
                                    <span className="product__info__item__list__item__size">
                                        {item.size.name}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item"  key="r3">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" >
                            <i className="bx bx-minus" onClick={()=>updateQuantity('minus')}></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" >
                            <i className="bx bx-plus" onClick={()=>updateQuantity('plus')}></i>
                        </div>
                        <span className= "product__info__item__quantity__favourite">
                            <Link>
                                {(wishlist)?<i className='bx bxs-heart'></i>:<i className='bx bx-heart'></i>}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="product__info__item"  key="r4">
                    <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{__html: productModel.description}}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default ProductView
   // component
   let ComponentPrice = (props) =>{
    if(props.currentPrice === undefined){
        if(props.priceFrom ===  props.priceTo){
            return (
                <div className="product-card__price __price-view">
                    {formatVND(numberWithCommas(props.priceRoot))}
                </div>
            )
        }else{
            return (
                <div className="product-card__price __price-view">
                    <span>
                        {formatVND(numberWithCommas(props.priceFrom))}
                    </span>
                    <span> - </span>
                    <span className="product-card__price __price-view">
                        {formatVND(numberWithCommas(props.priceTo))}
                    </span>
                </div>
            )
        }
    }else{
        if(props.currentPrice === props.priceRoot){
            return (
                <div className="product-card__price __price-view">
                    {formatVND(numberWithCommas(props.priceRoot))}
                </div>
            )
            
        }else{
            return (
                <div>
                    <div className="product-card__price __price-view">
                        <span>
                            {formatVND(numberWithCommas(props.currentPrice))}
                        </span>
                        <span className="product-card__price__old ">
                            <del>{numberWithCommas(props.priceRoot)}</del>
                        </span>
                    </div>
                    <div className="product-card__price__save">
                        <span>
                            Tiết kiệm: {formatVND(numberWithCommas(props.priceRoot - props.currentPrice))}
                        </span>
                    </div>
                </div>
            )
        }
    }
    
}
