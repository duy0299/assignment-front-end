import React, { useCallback, useEffect, useState } from 'react'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert';
import formatDate from '../../../utils/formatDate';
import categoriesService from '../../../service/categoriesService';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const actions = [
  { 
    icon: <i className='bx bx-info-circle _bxs-base'></i>, 
    name: 'Thông tin', 
  },
  { 
    icon: <i className='bx bx-trash _bxs-base'/>, 
    name: 'Xóa'
  }
]

const ListCategoriesAd = () => {
  const [categories, setCategories] = useState(undefined);

  const loadCategories = useCallback(()=>{
    categoriesService.getAll()
        .then((response)=>{
          console.log(response.data.result);
          setCategories(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[])



  useEffect(() => {
    
    loadCategories()
  }, []);

  // useEffect(() => {
  //   loadUsers()
  // }, []);
  

  return (     
    <div className='_ad-lists-user'>
      <h1>Danh Sách Loại sản phẩm</h1>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Mô Tả</TableCell>
              <TableCell align="left">Loại cấp dưới</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Ngày cập nhật gần nhất</TableCell>
              <TableCell align="left">Shỉnh Sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              (categories)?categories.map((item, index)=>(
                <RowTable category={item} key={index}  stt={index} reLoad={loadCategories}/>
              )):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListCategoriesAd



const RowTable = (props) => {
  const category = props.category
  const navigate = useNavigate();


  return (     
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.key}>
        <TableCell>{props.stt +1}</TableCell>
        <TableCell align="left">{category.name}</TableCell>
        <TableCell align="left">{category.description}</TableCell>
        <TableCell align="left">
          {
            (category.listChildren.length > 0)?category.listChildren.map((item,  index)=>{
              if(index === 0){
                return item.name
              }else{
                return ', ' +item.name
              } 
            }):"Không có"
          }
        </TableCell>
        <TableCell align="center">{(category.status)?"Bình thường":"Ngừng sử dụng"}</TableCell>
        <TableCell align="center">{formatDate(category.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(category.timeUpdate)}</TableCell>
        <TableCell align='center'>
          <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', right: 5, top: 12 }}
              icon={<i className='bx bxs-pencil _bxs-base'></i>}
              direction="left"
            >
              {
                actions.map((action, index) => (
                    <SpeedDialAction
                      key={index}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={(e)=>{
                        switch (action.name.trim()) {
                          case "xóa":{
                            swal({
                              title: "Chú ý",
                              text: "Bạn có chắc chắn muốn xóa không",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            })
                            .then((willDelete) => {
                              if (willDelete) {
                                swal("Đã xóa", {
                                  icon: "success",
                                });
                                categoriesService.delete(category.id)
                                .then((response)=>{
                                  props.reLoad()
                                  swal("Đã xóa", {
                                    icon: "success",
                                  });
                                })
                                .catch(function (error) {
                                  swal("Lỗi", "", "error");
                                  console.log(error);
                                })
                                
                              }
                            });
                            break;
                          }
                          
                          default:
                            navigate("/admin/model/"+category.id+"/info")
                            break;
                        }
                        
                      }}
                    />
                ))
              }
            </SpeedDial>
          </Box>
        </TableCell>
        
      </TableRow>
  )
}
