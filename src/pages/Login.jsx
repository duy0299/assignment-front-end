import React  from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Helmet from "../components/Helmet";
import '../sass/components/login.scss'

import authService from "../service/authService";
import cookies from '../service/cookies'

const Login = props => {
    return(
            <Helmet title='Đăng nhập'>
                <div className="login-body">
                    <Button>
                        <Link to='/'>Trở về</Link>
                    </Button>
                    <div id="loginform">
                        <h2 id="headerTitle">Đăng nhập</h2>
                        <Form />
                        <OtherMethods />
                    </div>
                </div>
            </Helmet>    
        );
}  


const Form = props => {
    const [email, setEmail] = useState(null);
    const [password, setpassword] = useState(null);
    const navigate = useNavigate();
    
    const  handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const  handleChangePassword = (e) => {
        setpassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(email, password)
            .then(function (response) {
                console.log(response.data.result);
                cookies.setUser(response.data.result);
                navigate("/home")
            })
            .catch(function (error) {
                alert(error.response.data.message);
                console.log(error);
            })
        
    };

    return  (
                <form onSubmit={handleSubmit} 
                    onChange={(e=>{
                        for (const i of e.target.form) {
                            if(i.name === "email"){
                                setEmail(i.value)
                            }
                            if(i.name === "password"){
                                setpassword(i.value)
                            }
                            
                        }
                    })} 
                >
                    <div class="row">
                        <label>email</label>
                        <input 
                            name="email"
                            type="email" 
                            placeholder="Nhập Email" 
                            // onChange={handleChangeEmail}
                        />
                    </div>  
                    <div class="row">
                        <label>password</label>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            // onChange={handleChangePassword}
                        />
                    </div> 
                    <SubmitButton value="Đăng nhập"/>
                </form>
            );
}
const SubmitButton = props => (
  <div id="button" class="row">
    <button type="submit">{props.value}</button>
  </div>
);


const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Đăng nhập với:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
    <div className="text-register-in-login">
        <Link to='/register'>Đăng ký tài khoản?</Link>
    </div>
  </div>
);

const Facebook = props => (
  <a href="#" id="facebookIcon">
    <i class='bx bxl-facebook' ></i>
  </a>
);

const Twitter = props => (
  <a href="#" id="twitterIcon">
    <i class='bx bxl-twitter' ></i>
  </a>
);

const Google = props => (
  <a href="#" id="googleIcon">
    <i class='bx bxl-google'></i>
  </a>
);

export default Login;