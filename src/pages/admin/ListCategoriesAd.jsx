import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Avatar } from '@mui/material';
import formatDate from '../../utils/formatDate';
import sizeService from '../../service/sizeService';
import categoriesService from '../../service/categoriesService';



const ListCategoriesAd = () => {
  const [categories, setCategories] = useState(undefined);

  const loadUsers = useCallback(()=>{
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
    
    loadUsers()
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
                <RowTable category={item} key={index}  stt={index} />
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
  useEffect(() => {
    
    setCategory(props.category)
    
  }, []);
  
  
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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </TableCell>
      </TableRow>
  )
}
