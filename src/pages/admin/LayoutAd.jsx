import { AppBar,  Avatar,  Box,   Drawer,  IconButton,  Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';

import React, { useEffect } from 'react'

import TabMenuLeft from '../../components/admin/TabMenuLeft';
import Helmet from '../../components/Helmet';
import userService from '../../service/userService';
import { useState } from 'react';
import { useCallback } from 'react';
import swal from 'sweetalert';
import {useNavigate } from 'react-router-dom';
import cookies from '../../utils/cookies';


const LayoutAd = (props) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const [admin, SetAdmin] = useState(undefined)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const toggleDrawer = ( openOrClose) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setMenu(openOrClose);
    };
    const LoadAdmin = useCallback(()=>{
        toggleDrawer(false)
       
        userService.getWithToken()
        .then((response)=>{
           
            for (const role of response.data.result.listRole) {
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
    const handleLogout = ()=>{
        cookies.deleteUser();
        setAnchorElUser(null);
        navigate("/login")
    }
 

    useEffect(() => {
        LoadAdmin();
        setMenu(false)
    }, []);


  return (
    <div className='_layoutAdmin'>
        {/* Menu */}
        <Drawer
            anchor={"left"}
            open={menu}
            onClose={toggleDrawer(false)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                
                onKeyDown={toggleDrawer(false)}
            >
                <TabMenuLeft closeMenu={()=>{toggleDrawer( false)}}/>

            </Box>
        </Drawer>
        <Helmet title='Trang chủ' >
            <Box className='_headerAdmin' sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <i className='bx bx-menu _iconBase'/>
                            
                            
                        </IconButton>
                        
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                           
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <i className='bx bxs-envelope _iconBase'></i>
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
                                <MenuItem key={1} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Trang điều khiển</Typography>
                                </MenuItem>
                                <MenuItem key={2} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Cài đặt</Typography>
                                </MenuItem>
                                <MenuItem key={3} onClick={handleLogout}>
                                    <Typography textAlign="center">Đăng xuất</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="_adMain">
                {props.children}
            </div>
            
            
        </Helmet>  
    </div>
  )
}

export default LayoutAd


