import React, { useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'
import cartSession from '../utils/cartSession'
import formatVND from '../utils/formatVND'
// let cartItems = cartSession.getCart()

const Cart = () => {

    const [load, setLoad] = useState(false)

    // const cartItems = cartSession.getCart()

    const [cartProducts, setCartProducts] = useState(cartSession.getCart())

    const [totalProducts, setTotalProducts] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)

    const changeLoad = useCallback(()=>{
        if(load){
            setLoad(false)
        }else{
            setLoad(true)
        }
    })

    useEffect(() => {
        const productIncart = cartSession.getCart();
       
        if(productIncart){
            let total = 0;
            setCartProducts(productIncart)
            
            for (let i of productIncart) {
                total += i.price * i.quantity;
            }
            setTotalPrice(total)
            setTotalProducts(productIncart.length)
        }else{
            setTotalPrice(0)
            setTotalProducts(0)
        }
        
        
    }, [load])

    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{formatVND(numberWithCommas(Number(totalPrice))) }</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            <Link to="/checkout">
                                Đặt hàng
                            </Link>
                        </Button>
                        
                        <Link to="/catalog/1">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        
                    </div>
                </div>
                <div className="cart__list">
                    {
                        (cartProducts)?cartProducts.map((item, index) => (
                            <CartItem item={item} key={index} callBack={changeLoad}/>
                        )):
                        <div className='text-list-empty'>
                            <p>Hiện Tại Chưa Có Sản Phẩm</p>
                        </div>
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
