import React, { useEffect, useState } from 'react'

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
import { Box, Button, SpeedDial, SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import swalErrorAPI from '../../../utils/swalErrorAPI';

const actions = [
  { 
    icon: <i className='bx bx-info-circle _bxs-base'></i>, 
    name: 'Thông tin', 
    link: 'info'
  },
  { 
    icon: <i className='bx bx-trash _bxs-base'/>, 
    name: 'Xóa',
    link: 'delete'
  }
]

const ListCategoriesAd = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(undefined);

  const loadCategories = ()=>{
    categoriesService.getAll()
        .then((response)=>{
          setCategories(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  }



  useEffect(() => {
    loadCategories()
  }, []);



  return (     
    <div className='_ad-lists-user'>
      <h1>Danh Sách Loại sản phẩm</h1>
      <Button onClick={()=>{navigate('/admin/category')}} variant="outlined" id="_inp-form-add" style={{ marginRight:'10%'}}> Thêm Loại sản phẩm </Button>
       <TableContainer component={Paper} style={{width:'80%',  margin:'0 10%'}}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Mô Tả</TableCell>
              <TableCell align="center">Số sản phẩm phụ thuộc</TableCell>
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
                <RowTable category={item} key={index}  stt={index} reload={loadCategories}/>
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
  const [category, setCategory] = useState(props.category);
  const navigate = useNavigate();
  const handleDelete = () => {
    swal({
      title: "Chú ý",
      text: "Bạn có chắc chắn muốn xóa không",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.reload()
        swal("Đã xóa", {
          icon: "success",
        });
        categoriesService.delete(category.id)
        .then((response)=>{
          swal("Đã xóa", {
            icon: "success",
          });
        })
        .catch(function (error) {
          swalErrorAPI(error)
          console.log(error);
        })
      }
    });
  };

  useEffect(() => {
    setCategory(props.category)
  
  }, [props]);

  return (     
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.stt}>
        <TableCell>{props.stt +1}</TableCell>
        <TableCell align="left">{category.name}</TableCell>
        <TableCell align="left">{category.description}</TableCell>
        <TableCell align="center">{category.listModel.length}</TableCell>
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
        <TableCell align="center"> {(category.status)?'Bình thường':<p className={"_status-0"}>Ngừng sử dụng</p>}</TableCell>
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
                        switch (action.link.trim()) {
                          case "delete":{
                            handleDelete()
                            break;
                          }
                          default:
                            navigate("/admin/category/"+category.id+"/info")
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
