import React from 'react'
// import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
// import CartItem from '../components/CartItem'
// import Button from '../components/Button'


// import numberWithCommas from '../utils/numberWithCommas'

const Cart = () => {

    return (
        <Helmet title='Giỏ hàng'>
            {/* <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có  sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền:</span> <span>{"90"}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        
                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))
                    }
                </div>
            </div> */}
        </Helmet>
    )
}

export default Cart
