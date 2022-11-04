import { AppBar,  Avatar,  Box,  Grid,  IconButton, Menu, MenuItem, Paper, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import React, { useEffect } from 'react'

import TabMenuLeft from '../../components/admin/TabMenuLeft';
import Helmet from '../../components/Helmet';
import userService from '../../service/userService';
import { useState } from 'react';
import { useCallback } from 'react';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
// import cookies from '../../utils/cookies';




const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const LayoutAd = (props) => {
    const navigate = useNavigate();
    const  history = useLocation();

    const [admin, SetAdmin] = useState(undefined)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const LoadAdmin = useCallback(()=>{
        // cookies.getUser()
        userService.getWithToken()
        .then((response)=>{
            for (const role of response.data.result.listRole) {
                console.log(role)
                if(role === "ADMIN" || role === "FEEDBACK_MANAGER" || role === "ORDER_MANAGER" || 
                    role === "WAREHOUSE_MANAGER" || role === "USER_MANAGER"  ){
                        SetAdmin(response.data.result);
                        return true;
                }
            }
            swal ( {
                title: "Xin lỗi",
                text: "Bạn Không đủ quyền để truy cập!",
                icon: "warning",
                button: "Đăng nhập"
              })
            .then(( value ) =>  { 
                navigate("/login")
            } ) ;
        })
        .catch((error)=>{
            console.log(error);
            swal ( {
                title: "Xin lỗi",
                text: "Bạn Không đủ quyền để truy cập!",
                icon: "warning",
                button: "Đăng nhập"
              }  )
            .then ( ( value ) =>  { 
                navigate("/login")
            } ) ;
        })
    },[])

    useEffect(() => {
        LoadAdmin();
    
    }, [history]);


  return (
    <div className='_layoutAdmin'>
        <Helmet title='Trang chủ'>
            <Box className='_headerAdmin' sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MailIcon/>
                        </IconButton>
                        
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={(admin)?admin.avatar:"/static/images/avatar/2.jpg"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                    
                    </Grid>
                    <Grid item xs={9}>
                        <div className="_adMain">
                            {props.children}
                        </div>
                    </Grid>
                    
                </Grid>
            </Box>
            <TabMenuLeft/>

            
        </Helmet>  
    </div>
  )
}

export default LayoutAd


