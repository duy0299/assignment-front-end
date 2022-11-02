import React, { useState } from 'react'

import Grid from '../components/Grid'

import '../sass/components/_form-register.scss'

import authService from "../service/authService";


const Register = () => {
    const [email,       setEmail] = useState(null);
    const [phone,       setPhone] = useState(null);
    const [firstName,   setFirstName] = useState(null);
    const [lastName,    setLastName] = useState(null);
    const [gender,      setGender] = useState(null);
    const [password,    setpassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault(firstName, lastName, phone, gender, email, password, passwordConfirmation);
        authService.register()
            .then(function (response) {
                // console.log(response.data.result);
                // cookies.setUser(response.data.result);
                // navigate("/home")
            })
            .catch(function (error) {
                alert(error.response.data.message);
                console.log(error);
            })
        
    };

    const handleFromChange = (e) => {
        for (const i of e.target.form) {
            switch (i.name) {
                case "email":{
                    setEmail(i.value)
                    break;
                }
                case "phone":{
                    setPhone(i.value)
                    break;
                }
                case "firstName":{
                    setFirstName(i.value)
                    break;
                }
                case "lastName":{
                    setLastName(i.value)
                    break;
                }
                case "gender":{
                    if(i.checked===true){
                        setGender(i.value)
                    }
                    break;
                }
                case "password":{
                    setpassword(i.value)
                    break;
                }
                case "passwordConfirmation":{
                    setPasswordConfirmation(i.value)
                    break;
                }
                default:
                    break;
            }
        }
    console.log({firstName, lastName, phone, gender, email, password, passwordConfirmation});           

    };


  return (
    <form action="#" className='form-register' onSubmit={handleSubmit} onChange={handleFromChange}>
        <div>
            <h4>Đăng ký</h4>
            <div className="__row-form-register">
                <div className='form-register__grid1'>
                    <Grid 
                        col={3}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        <div className="form-register__grid1__input__div">
                            <label>Họ</label><br />
                            <input className="form-register__grid1__input" name='firstName' type="text" placeholder="Nhập vào họ"/>
                        </div>
                        <div className="form-register__grid1__input__div">
                            <label>Tên</label><br />
                            <input className="form-register__grid1__input" name='lastName' type="text" placeholder="Nhập vào tên"/>
                        </div>
                        <div  className="form-register__grid1__radio ">
                            <label>Giới tính *</label><br />
                            <input name="gender" type="radio" value="Nam" />Nam
                        </div>
                        <div className="form-register__grid1__input__div">
                            <label>Email *</label><br />
                            <input name='email' className="form-register__grid1__input" type="email" placeholder="Nhập vào Email"/>
                        </div>
                        <div className="form-register__grid1__input__div">
                            <label>Điện Thoại *</label><br />
                            <input className="form-register__grid1__input" name='phone' type="tel" placeholder="Nhập vào số điện thoại"/>
                        </div>
                        <div  className="form-register__grid1__radio">
                            <input name="gender" type="radio" value="Nữ" />Nữ
                        </div>
                        <div className="form-register__grid1__input__div">
                            <label>Mật khẩu</label><br />
                            <input 
                                className="form-register__grid1__input" 
                                name='password'
                                type="password" 
                                placeholder="Nhập mật khẩu"
                                title='Phải có ít nhất 1 chữ hoa, 1 chữ viết thường, 1 số tự nhiên và dài  từ 8 - 20 ký tự'
                        />
                        </div>
                        <div className="form-register__grid1__input__div">
                            <label>Xác nhận lại mật khẩu</label><br />
                            <input 
                                name='passwordConfirmation'
                                className="form-register__grid1__input" 
                                type="password" 
                                placeholder="Xác nhận lại mật khẩu"
                            />
                        </div>
                    </Grid>
                </div>
                
                <div className="form-register__grid2">
                    <Grid 
                        col={5}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        <div><span> </span></div>
                        <div><span> </span></div>
                        <div className="form-register__grid2__div">
                            <button>Register</button>
                        </div>
                        <div><span> </span></div>
                        <div><span> </span></div>
                    </Grid>
                </div>
                
                
                
            </div>
        </div>
    </form>
  )
}

export default Register
