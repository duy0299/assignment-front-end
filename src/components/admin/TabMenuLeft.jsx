import React, { useCallback } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
const linkAdmin = '/admin/'

const menu = [
  {
    title: "Người Dùng",
    link: "",
    listChildren: [
      {
        title: "Danh sách",
        link: linkAdmin+"users/list",
      },
      {
        title: "Thêm sản phẩm",
        link: linkAdmin+"user/add",
      }
    ]
  },
  {
    title: "Đơn Hàng",
    link: linkAdmin+"order/list"
  },
  {
    title: "Mẫu Sản Phẩm",
    link: "",
    listChildren: [
      {
        title: "Danh Sách",
        link: linkAdmin+"model/list",
      },
      {
        title: "Thêm Sản Shẩm",
        link: linkAdmin+"model/add",
      }
    ]
  },
  {
    title: "Sản Phẩm",
    link: "",
    listChildren: [
      {
        title: "Danh Sách",
        link: linkAdmin+"product/list",
      },
      {
        title: "Thêm Mẫu Sản Phẩm",
        link: linkAdmin+"product/add",
      }
    ]
  },
  {
    title: "Kích Thước",
    link: "",
    listChildren: [
      {
        title: "Danh sách",
        link: linkAdmin+"sizes/list",
      },
      {
        title: "Thêm sản phẩm",
        link: linkAdmin+"size/add",
      }
    ]
  },
  {
    title: "Thể Loại Trang Sức",
    link: "",
    listChildren: [
      {
        title: "Danh sách",
        link: linkAdmin+"category/list",
      },
      {
        title: "Thêm sản phẩm",
        link: linkAdmin+"categories/add",
      }
    ]
  },
  {
    title: "Cài đặt",
    link: linkAdmin+"setting"
  }
]


const TabMenuLeft = () => {
  const toggleTab = useCallback(
    (e) => {
        let list =  document.getElementsByClassName("_titleCategories");
        for (const i of list) {
           i.classList.remove("_choose");
        }
        e.target.classList.add("_choose")
    },
    [],
  )
  return (
    <div className='_ad-menu-left'>
      {
        menu.map((item, index)=>{
          if(item.link.trim()!==""){
            return (
                <Accordion TransitionProps={{ unmountOnExit: false }}>
                  <Link to={item.link}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography >
                            <span onClick={toggleTab} className='_titleCategories'>{item.title}</span> 
                        </Typography>
                      </AccordionSummary>
                  </Link>
                </Accordion>
              )
          }else{
              return (
                  <Accordion>
                      {/* parent */}
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                      >
                          <Typography >
                            <span onClick={toggleTab} className='_titleCategories'>{item.title}</span> 
                          </Typography>
                      </AccordionSummary>
                      {/* children */}
                      {
                          item.listChildren.map((item, index)=>(
                              <AccordionDetails key={index}>
                                  <Link to={item.link}>
                                      <Typography >
                                          <span onClick={toggleTab} className='_titleCategories'>{item.title}</span> 
                                      </Typography>
                                  </Link>
                              </AccordionDetails>
                          ))
                      }
                  </Accordion>
              )
          }
          })
      }
    
    </div>
  )
}

export default TabMenuLeft

