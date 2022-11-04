import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'


import numberWithCommas from '../utils/numberWithCommas'
import { Link } from 'react-router-dom'
import formatVND from '../utils/formatVND'
import cartSession from '../utils/cartSession'

const CartItem = props => {


    const itemRef = useRef([])

    const [item, setItem] = useState(props.item)
    const [quantity, setQuantity] = useState(props.item.quantity)

    useEffect(() => {
        setItem(props.item)
        setQuantity(props.item.quantity)
    }, [props.item])

    const updateQuantity = (opt) => {
        if (opt === '+') {
            cartSession.addToCart(item, 'up')
        }
        if (opt === '-') {
            cartSession.addToCart(item, 'down')
        }
        props.callBack();
    }

    const updateCartItem = () => {
        let newi = item;
        newi.quantity= quantity;
        cartSession.addToCart(newi, 'change');
        props.callBack();
    }

    const removeCartItem = () => {
        cartSession.deleteCart(item.productId)
        props.callBack();
    }

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.avatar} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        {`${item.name} - size ${item.size}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {formatVND(numberWithCommas(item.price)) }
                </div>
                <div className="cart__item__info__quantity">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('-')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            {quantity}
                        </div>
                        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('+')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__del">
                    <i className='bx bx-trash' onClick={() => removeCartItem()}></i>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object
}

export default CartItem
