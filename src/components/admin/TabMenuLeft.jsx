import React, { useCallback } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
const linkAdmin = '/admin/'

const menu = [
  {
    title: "Users",
    link: linkAdmin+"users/list/1",
  },
  {
    title: "Đơn Hàng",
    link: linkAdmin+"orders/list/1"
  },
  {
    title: "Thư phản ánh",
    link: linkAdmin+"feedback/list/1"
  },
  {
    title: "Đánh giá",
    link: linkAdmin+"ratings/list/1"
  },
  {
    title: "Mẫu Sản Phẩm",
    link: "",
    listChildren: [
      {
        title: "Danh Sách",
        link: linkAdmin+"models/list/1",
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
        link: linkAdmin+"products/list/1",
      },
      {
        title: "Thêm Sản Phẩm",
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
        link: linkAdmin+"categories/list",
      },
      {
        title: "Thêm sản phẩm",
        link: linkAdmin+"category/add",
      }
    ]
  },
  {
    title: "Cài đặt",
    link: linkAdmin+"setting",
    icon: <i class='bx bxs-cog'></i>
  }
]


const TabMenuLeft = (props) => {
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
    <div className='_ad-menu-left' >
      {
        menu.map((item, index)=>{
          if(item.link.trim()!==""){
            return (
                <Accordion TransitionProps={{ unmountOnExit: false }}>
                  <Link to={item.link} onClick={()=>{props.closeMenu()}}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography >
                            {
                              (item.icon)?item.icon:null
                            }
                            <span onClick={toggleTab} className='_titleCategories'> {item.title}</span> 
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
                                  <Link to={item.link} >
                                      <Typography >
                                          {
                                            (item.icon)?item.icon:null
                                          }
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

