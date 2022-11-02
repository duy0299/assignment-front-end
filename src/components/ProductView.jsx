import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Button from './Button'


import numberWithCommas from '../utils/numberWithCommas'
import formatVND from '../utils/formatVND'
const ProductView = props => {
    let productModel = props.productModel
    let priceSave = 0;
    const [previewImg, setPreviewImg] = useState(productModel.listImages[0])
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [product, setProduct] = useState(undefined)
    const [quantity, setQuantity] = useState(1)
    let wishlist  = true;
    const email = "b@gmail.com"
    for (const item of productModel.listUserLike ) {
        if (item === email) {
            wishlist = true;
        }
    }

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(productModel.listImages[0])
        setQuantity(1)
        setProduct(undefined)
    }, [productModel])

    useEffect(() => {
       
    })

    const check = () => {
        if (product === undefined) {
            alert('Vui lòng chọn kích cỡ!')
            return false
        }
        return true
    }

    const addToCart = () => {
        // if (check()) {
        //     let newItem = {
        //         slug: productModel.slug,
        //         product: product,
        //         price: productModel.price,
        //         quantity: quantity
        //     }
            // if (dispatch(addItem(newItem))) {
            //     alert('Success')
            // } else {
            //     alert('Fail')
            // }
        // }
    }

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
    let ComponentPrice = (props) =>{
        if(props.currentPrice === undefined){
            if(props.priceFrom ===  props.priceTo){
                return (
                    <div className="product-card__price">
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
            console.log(props.currentPrice, props.priceRoot, props.priceTo);
            if(props.currentPrice > props.priceRoot){
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
                <div className="product__info__item">
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
                                        // currentPrice={productModel.currentPrice}
                                        />}
                        
                    </span>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            productModel.listProduct.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${(((product!==undefined)?product.size.id:null) === item.size.id) ? 'active' : ''}`} onClick={() => setProduct(item)}>
                                    <span className="product__info__item__list__item__size">
                                        {item.size.name}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
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
                            {(wishlist)?<i class='bx bxs-heart'></i>:<i class='bx bx-heart'></i>}
                        </span>
                    </div>
                </div>
                <div className="product__info__item">
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

export default withRouter(ProductView)
