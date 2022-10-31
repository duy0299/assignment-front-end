import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

// import { useDispatch } from 'react-redux'

// import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'
import formatVND from '../utils/formatVND'

const ProductCard = props => {

    // const dispatch = useDispatch()

    return (
        <div className="product-card">
            <Link to={`/product/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {formatVND(numberWithCommas(props.price))}
                    <span className="product-card__price__old">
                        <del>{formatVND(numberWithCommas(399000))}</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Link to={`/cart`}>
                    <Button
                        size="sm"    
                        icon="bx bx-cart"
                        animate={true}
                        // onClick={() => dispatch(set(props.slug))}
                    >
                        chọn mua
                    </Button>
                </Link>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard
