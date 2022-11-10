import React, { useCallback, useState, useEffect, useRef, useContext } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { Accordion,  AccordionSummary,  Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import swal from 'sweetalert'

import Helmet from '../components/Helmet'

import Grid from '../components/Grid'

import userService from '../service/userService';
import cookies from '../utils/cookies';
import addAvatar from '../utils/addAvatar';
import { LoadLayout } from './Layout';
import swalErrorAPI from '../utils/swalErrorAPI';

const MyAccount = () => {
    const navigate = useNavigate();

    const params = useParams();
    const [user, setUser] = useState(undefined)
    const [content, setContent] = useState('info')

    

    const loadUser = useCallback(
        () => {
            userService.getWithToken()
            .then(function (response) {
                console.log(response.data.result);
                setUser(response.data.result)
                
            })
            .catch(function (error) {
                console.log(error);
                swal("Lỗi", "bạn chưa đăng nhập", "error");
                navigate("/login")
                return null
            });
        },
        [params]
    )
    const toggleTabInfo = useCallback(
        (e) => {
            let list =  document.getElementsByClassName("_titleCategories");
            for (const i of list) {
                i.classList.remove("_choose");
            }
            e.target.classList.add("_choose")
            setContent('info')
        },
        [],
    )
    const toggleTabOrder = useCallback(
        (e) => {
            let list =  document.getElementsByClassName("_titleCategories");
            for (const i of list) {
                i.classList.remove("_choose");
            }
            e.target.classList.add("_choose")
            setContent('order')
        },
        [],
    )
    const toggleTabPassword = useCallback(
        (e) => {
            let list =  document.getElementsByClassName("_titleCategories");
            for (const i of list) {
                i.classList.remove("_choose");
            }
            e.target.classList.add("_choose")
            setContent('password')
        },
        [],
    )
    const logout = ()=>{
        cookies.deleteUser();
        navigate('/login')
    }

    useEffect(() => {
        loadUser()
    }, []);


    const filterRef = useRef(null)

    
    

    
    return (
        <Helmet title="Trang cá nhân">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close">
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <nav className='animated _bounceInDown'>
                                <ul>
                                    <Accordion TransitionProps={{ unmountOnExit: false }}>
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >
                                                <span onClick={toggleTabInfo} className='_titleCategories _choose'>Thông tin</span> 
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                    <Accordion TransitionProps={{ unmountOnExit: false }}>
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >
                                                <span onClick={toggleTabOrder} className='_titleCategories'>Đơn hàng</span> 
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                    <Accordion TransitionProps={{ unmountOnExit: false }}>
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >
                                                <span onClick={toggleTabPassword} className='_titleCategories'>Đổi mật khẩu</span> 
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                    <Accordion TransitionProps={{ unmountOnExit: false }}>
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >
                                                <span onClick={logout} className='_titleCategories'>Đăng xuất</span> 
                                            </Typography>
                                        </AccordionSummary>
                                    </Accordion>
                                </ul>
                            </nav>
                        </div>
                    </div>                   
                </div>
                <div className="catalog__content _userContent">
                    {
                        (user)?
                            <ContentPage content={content} user={user}/>
                        :null

                    }
                    
                </div>
            </div>
        </Helmet>
    )
}

export default MyAccount


const ContentPage = (props)=>{
    // const navigate = useNavigate();
    const loadLayout = useContext(LoadLayout);
    const [gender, setGender] = useState(props.user.gender);
    
    const handleChange = (event) => {
        setGender(event.target.value);
    };
    const handleSubmitAvatar = (e) => {
        e.preventDefault();
        let formData = new FormData(document.getElementById('formSubmitAvatar'));
        if(document.getElementById('inputAvatar-').files.length > 0){
            userService.updateAvatar(formData)
            .then((response)=>{
                swal("cập nhật thành công", " ", "success");
                loadLayout.reloadUser()
            })
            .catch((error)=>{
                console.log(error);
                swalErrorAPI(error)
            });
        }else{
            swal("Bạn chưa chọn Avatar mới", " ", "warning");
        }
        
    };
    const handleSubmitInfo = (e) => {
        e.preventDefault();
        const firstName = document.getElementsByName('firstName')[0].value;
        const lastName =  document.getElementsByName('lastName')[0].value
        const phoneNumber =document.getElementsByName('phoneNumber')[0].value
        const inpGender    = document.getElementsByName('gender');
        let valueGender;
        for (const i in inpGender) {
            if (inpGender[i].checked) {
                valueGender = inpGender[i].value;
            }
        }
        userService.updateInfo(firstName, lastName, phoneNumber, valueGender)
        .then((response)=>{
            swal("Thây đổi thành công", " ", "success");
        })
        .catch((error)=>{
            console.log(error);
            swalErrorAPI(error)
        });

    };
    const handleSubmitPassword= (e) => {
        e.preventDefault();
        const password = document.getElementsByName('password')[0].value;
        const newPassword =  document.getElementsByName('newPassword')[0].value
        const passwordConfirmation =document.getElementsByName('passwordConfirmation')[0].value
        
        userService.updatePassword(password, newPassword, passwordConfirmation)
        .then((response)=>{
            swal("Cập nhật thành công", " ", "success");
        })
        .catch((error)=>{
            console.log(error);
            swalErrorAPI(error)
        });

    };

    useEffect(()=>{
        setGender(props.user.gender)
        if(props.content === 'info'){
            addAvatar('btnAvatar-', 'inputAvatar-', 'imgAvatar-');
        }
    },[props])

    switch (props.content) {
        case 'info':{
            return(
                
                    <Grid
                        col={2}
                        mdCol={2}
                        smCol={1}
                        gap={20}    
                    >
                        <form onSubmit={handleSubmitAvatar} id='formSubmitAvatar' encType="multipart/form-data">
                            <Grid
                                col={1}
                                mdCol={2}
                                smCol={1}
                                gap={20}    
                            >
                                <input 
                                    id={"inputAvatar-"}
                                    name="fileAvatar"
                                    type="file"
                                    hidden
                                />
                                <img className='avatarMyAccount' id={'imgAvatar-'} src={props.user.avatar} alt="avatar" width='30%' />
                                <div className='_btnAvatarMyAccount'>
                                    <Button  variant="outlined"  id={"btnAvatar-"}>Chọn Avatar</Button>
                                </div>
                                <div className='_btnSubmitAvatarMyAccount'>
                                    <Button type='submit'  variant="outlined"  id={"sbtnAvatar-"}>Cập nhật Avatar</Button>
                                </div>
                            </Grid>
                        </form>
                        <form onSubmit={handleSubmitInfo} >
                            <Grid
                                col={2}
                                mdCol={2}
                                smCol={1}
                                gap={20}    
                            >
                                <TextField
                                    fullWidth 
                                    defaultValue={props.user.firstName}
                                    required
                                    name="firstName"
                                    label="Họ"
                                />
                                <TextField
                                    fullWidth 
                                    defaultValue={props.user.lastName}
                                    required
                                    name="lastName"
                                    label="Tên"
                                />
                                <TextField
                                    fullWidth 
                                    defaultValue={props.user.email}
                                    required
                                    name="email"
                                    label="Email"
                                />
                                <TextField
                                    fullWidth 
                                    defaultValue={props.user.phoneNumber}
                                    required
                                    name="phoneNumber"
                                    label="Số điện thoại"
                                />
                                <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        
                                        <FormControlLabel  control={<Radio name='gender' value={'nam'}  
                                            checked={gender.toLowerCase() === 'nam'}
                                            onChange={handleChange}
                                        />} label="Nam" />
                                        <FormControlLabel  control={<Radio name='gender' value={'nữ'}  
                                            checked={gender.toLowerCase() === 'nữ'}
                                            onChange={handleChange}
                                        />} label="Nữ" />
                                    </RadioGroup>
                                </FormControl>
                                
                                <div className='_btn-updateUserInfo'>
                                    <Button type='submit' variant="outlined" >Cập nhật</Button>
                                </div>

                            </Grid>
                        </form>
                    </Grid>
            )
        }
        case 'password':{
            return(
                <Grid
                    col={2}
                    mdCol={2}
                    smCol={1}
                    gap={20}    
                >
                    <form onSubmit={handleSubmitPassword}>
                        <Grid
                            col={2}
                            mdCol={2}
                            smCol={1}
                            gap={20}    
                        >
                            <TextField
                                fullWidth 
                                required
                                name="password"
                                type={'password'}
                                label="Mật khẩu củ"
                            />
                            <TextField
                                fullWidth 
                                required
                                name="newPassword"
                                type={'password'}
                                label="Mật khẩu mới"
                            />
                            <TextField
                                fullWidth 
                                required
                                name="passwordConfirmation"
                                type={'password'}
                                label="Xác nhận lại mật khẩu"
                            />
                            <div className='_btn-updateUserInfo'>
                                <Button type='submit' variant="outlined" >Cập nhật</Button>
                            </div>

                        </Grid>
                    </form>
                </Grid>
            )
        }
    
        default:
            break;
    }
}

