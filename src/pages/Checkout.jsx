import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Grid from '../components/Grid';
import orderService from '../service/orderService';
import userService from '../service/userService';
import cartSession from '../utils/cartSession'
import formatVND from '../utils/formatVND';
import numberWithCommas from '../utils/numberWithCommas';
import swalErrorAPI from '../utils/swalErrorAPI';
import validate from '../utils/validate';


const Checkout = () => {
    const  history = useLocation();
    const  navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState(cartSession.getCart())
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [user, setUser] = useState(null)
    const [total, setTotal] = useState(0)

    const loadUser = useCallback(()=>{
        userService.getWithToken()
        .then((response)=>{
            setUser(response.data.result)
        })
        .catch((error)=>{
            swalErrorAPI(error)
        })
        
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate.postOrder(address, note, cartProducts)) {
            try {
                orderService.insert(address, note, cartProducts)
                .then(function (response) {
                    swal ({
                            title: "Thành  công",
                            text: "Đơn hàng của bạn đã được xác nhận",
                            icon: "success",
                            button: "OK"
                    })
                    .then ( ( value ) =>  {
                        cartSession.clearCart(); 
                        navigate("/home")
                    } ) ;
                })
                .catch(function (error) {
                    console.log(error);
                    swalErrorAPI(error)
                    return null
                })
            } catch (error) {
                console.log(error);
            }
        };
    }

    const changeForm = useCallback((e)=>{
        for (const i of e.target.form) {
            if(i.name === "address"){
                setAddress(i.value)
            }
            if(i.name === "note"){
                setNote(i.value)
            }
            
        }
    },[])

    useEffect(() => {
        setCartProducts(cartSession.getCart())
        let sum = 0;
        for (const item of cartSession.getCart()) {
            sum +=item.price *item.quantity
        }
        setTotal(sum)
        loadUser()
    }, [history]);

    

  return (
    <div className='_checkoutPage'>
        <Grid
            col={2}
            mdCol={2}
            smCol={1}
            gap={20}    
        >
            <form className='_checkoutPage__form' onSubmit={handleSubmit} onChange={changeForm}>
                <Grid
                    col={1}
                    mdCol={2}
                    smCol={1}
                    gap={20}    
                >
                    <Grid
                        col={2}
                        mdCol={2}
                        smCol={1}
                        gap={20}    
                    >
                        <div>
                            <label htmlFor="address">Địa chỉ</label>
                            <input name='address'  id='address' value='' type="text"  placeholder='điền vào địa chỉ cần gửi'/>
                        </div>
                        
                        <div>
                            <label htmlFor="fullName">Họ Và Tên</label>
                            <input disabled id='fullName' type="text" 
                                value={(user)?user.firstName+ " " + user.lastName:""}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Số điện thoại</label>
                            <input disabled id='phone' type="text" 
                                value={(user)?user.phoneNumber:""}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input disabled id='email' type="text" 
                                value={(user)?user.email:""}/>
                        </div>
                    </Grid>
                    
                    <div>
                        <label htmlFor="note">Ghi chú</label><br />
                        <textarea name='note'  id='note' type="text" ></textarea>
                    </div>
                    <div>
                        <input   type="submit" value={"Xác Nhận"} />
                    </div>
                </Grid>
                
            </form>   

            <div className='_checkoutPage__bill'>
                <h3>Hóa Đơn</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Sản Phẩm</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (cartProducts)?cartProducts.map((item, index)=>(
                                <tr>
                                    <td className='_checkoutPage__bill__tdLeft'>{item.name} x {item.quantity}</td>
                                    <td>{formatVND( numberWithCommas(Number.parseInt(item.price) * Number.parseInt(item.quantity)) )}</td>
                                </tr>
                            )):
                            null
                        }
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Tổng tiền:</td>
                            <td className='_checkoutPage__bill__tdLeft'>{formatVND(numberWithCommas(total))}</td>
                        </tr>
                    </tfoot>
                
            </table>
            </div>
        </Grid>
    </div>
  )
}

export default Checkout
