import { Avatar, Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useRef, useEffect, useCallback, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

import logo from '../assets/images/Logo-2.png'
import { LoadLayout } from '../pages/Layout'
import changeToSlug from '../utils/changeToSlug'
import cookies from '../utils/cookies'
import Button from './Button'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog/page/1"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    },
    {
        display: "Danh sách yêu thích",
        path: "/wishlist"
    }
]


const Header = (props) => {
    const loadLayout = useContext(LoadLayout);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const activeNav = mainNav.findIndex(e=> e.path === pathname)
    const headerRef = useRef(null)
    const menuLeft = useRef(null);
    const user = props.user;
    
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const menuToggle = () => {
        return menuLeft.current.classList.toggle('active')
    }
    const scrollhandler = useCallback(() => {
        if(headerRef.current !== null && headerRef.current !== undefined){
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        }
    },[])
    const handleLogout = ()=>{
        cookies.deleteUser();
        setAnchorElUser(null);
        loadLayout.reloadUser();
        navigate("/login")
    }
    const handleNavigateMyAccount = (e)=>{
        setAnchorElUser(null);
        navigate("/my-account")
    }
    const clickSearch = () => {
        swal({
            text: 'Nhập vào tên sản phẩm bạn muốn tìm',
            content: "input",
            button: {
              text: "Tìm kiếm!",
              closeModal: true,
            },
          })
          .then(name => {
            if (!name) throw null;
            navigate(`/catalog/search/${changeToSlug(name)}/page/1`)
            swal.stopLoading();
            swal.close();
          })
          
    }
// hàm dùng khi cuộn màn hình xuống
    useEffect(() => {
        window.addEventListener("scroll", scrollhandler)
        return () => {
            window.removeEventListener('scroll', scrollhandler)
        };
    }, []);
    
    useEffect(() => {
    }, [props]);
    
    

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div 
                                key={index}   
                                className={  `header__menu__item 
                                header__menu__left__item' ${ item === activeNav ? 'active':''}`}
                                onClick={menuToggle}>
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <Link><i className="bx bx-search" onClick={clickSearch}></i></Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                                <div className='_quantityProductCart'>
                                    <span>{props.quantityInCart}</span>
                                </div>
                            </Link>
                        </div>
                        {
                            (user)
                            ?
                            <Box>
                                <Tooltip title="Open settings">
                                    <a href="javascript:void(0)" onClick={handleOpenUserMenu}>
                                        <Avatar alt="Remy Sharp" src={(user)?user.avatar:logo} />
                                    </a>
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
                                    <MenuItem key={0} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{user.firstName + " " + user.lastName}</Typography>
                                    </MenuItem>
                                    <MenuItem key={1} onClick={handleNavigateMyAccount}>
                                        <Typography textAlign="center">Trang Cá nhân</Typography>
                                    </MenuItem>
                                    <MenuItem key={2} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Cài đặt</Typography>
                                    </MenuItem>
                                    <MenuItem key={3} onClick={handleLogout}>
                                        <Typography textAlign="center">Đăng xuất</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>:
                            <div className="header__menu__item header__menu__right__item">
                                <Link to="/login">
                                    <Button>Đăng nhập</Button>
                                </Link>
                            </div>
                        
                        }
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
