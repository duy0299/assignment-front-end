import React, { useRef, useEffect, useCallback } from 'react'
import { Link, useLocation, useResolvedPath } from 'react-router-dom'
import swal from 'sweetalert'

import logo from '../assets/images/Logo-2.png'
import cookies from '../utils/cookies'
import Button from './Button'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
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
// useLocation() để lấy path name phía sau host
    const {pathname} = useLocation();
    const activeNav = mainNav.findIndex(e=> e.path === pathname)
    const headerRef = useRef(null)
    const menuLeft = useRef(null);
    const user = cookies.getUser();
    
    const menuToggle = () => {
        console.log(menuLeft);
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
    })

    const clickSearch = useCallback(() => {
        swal({
            text: 'Nhập vào tên sản phẩm bạn muốn tìm',
            content: "input",
            button: {
              text: "Tìm kiếm!",
              closeModal: false,
            },
          })
          .then(name => {
            if (!name) throw null;
           
            return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
          })
          .then(results => {
            return results.json();
          })
          .then(json => {
            const movie = json.results[0];
           
            if (!movie) {
              return swal("No movie was found!");
            }
           
            const name = movie.trackName;
            const imageURL = movie.artworkUrl100;
           
            swal({
              title: "Top result:",
              text: name,
              icon: imageURL,
            });
          })
          .catch(err => {
            if (err) {
              swal("Oh noes!", "The AJAX request failed!", "error");
            } else {
              swal.stopLoading();
              swal.close();
            }
          });
    })
// hàm dùng khi cuộn màn hình xuống
    useEffect(() => {
        window.addEventListener("scroll", scrollhandler)
        return () => {
            window.removeEventListener('scroll', scrollhandler)
        };
    }, []);
    

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
                                header__menu__left__item' ${ index === activeNav ? 'active':''}`}
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
                            </Link>
                        </div>
                        {
                            (user === null)
                            ?
                            <div className="header__menu__item header__menu__right__item">
                                <Link to="/login">
                                    <Button>Đăng nhập</Button>
                                </Link>
                            </div>
                            :
                            <div className="header__menu__item header__menu__right__item">
                                <Link><i className="bx bx-user"></i></Link>
                            </div>
                        }
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
