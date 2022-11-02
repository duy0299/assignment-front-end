import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'

// import { useDispatch } from 'react-redux'

// import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'
import formatVND from '../utils/formatVND'



const ProductCard = props => {
    // console.log(props.product);
    const [value, setValue] = useState( props.product.start );
    // console.log(props.product);
    const id        = props.product.id       
    const img01     = props.product.listImages[0]
    const img02     = props.product.listImages[1]
    const name      = props.product.name     
    const priceTo   = props.product.priceTo  
    const priceFrom = props.product.priceFrom
    const priceRoot = props.product.priceRoot
    let wishlist  = true;
    const email = "b@gmail.com"
    for (const item of props.product.listUserLike ) {
        if (item === email) {
            wishlist = true;
        }
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
    

    return (
        <div className="product-card">
            <Link to={`/product/${id}`}>
                <div className="product-card__image">
                    <img src={img01} alt="avatar" />
                    <img src={img02} alt="avatar" />
                </div>
                <h3 className="product-card__name">{name}</h3>
                <div className="product-card__price">
                    <ComponentPrice 
                        priceRoot={priceRoot} 
                        priceFrom={priceFrom} 
                        priceTo={priceTo}/>
                </div>
                <div className="product-card__price">
                    <Rating
                        name="Read only"
                        value={value}
                        readOnly
                    />
                    <span className="product-card__price__old">
                        {(wishlist)?<i class='bx bxs-heart'></i>:<i class='bx bx-heart'></i>}
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Link to={`/cart`}>
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
