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
import {  useNavigate, useParams } from 'react-router-dom';

import { Rating } from '@mui/material';
import formatDate from '../../utils/formatDate';
import ratingService from '../../service/ratingService';



const ListRatingAd = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [ratings, setRatings] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(params.page);
    const [totalPage, setTotalPage] = useState(1);

  const loadModels = useCallback(()=>{
    ratingService.getAll(currentPage)
        .then((response)=>{
          console.log(response.data);
          setRatings(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[currentPage])



  useEffect(() => {
    
    loadModels()
  }, [currentPage]);



  return (     
    <div className='_ad-lists-table'>
      <h1>Danh sách đánh giá</h1>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination  count={totalPage} color="primary" 
                defaultValue={currentPage} 
                onChange={(e, value)=>{
                  setCurrentPage(value)
                  params.page =value;
                  navigate(`/admin/ratings/page/${value}`)
                }
               }
              
            />
          </Stack>
          
        </div>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Người Đánh Giá</TableCell>
              <TableCell align="left">Mẫu Sản phẩm</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số sao</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Ngày Tạo</TableCell>
              <TableCell align="center">Ngày cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (ratings === undefined)?null:ratings.map((item, index)=>{
                console.log(item);
                return <RowTableDescription rating={item} key={index} />
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListRatingAd



const RowTableDescription = (props) => {
  
  const params = useParams();
  const [open, setOpen] = useState(false);
  const rating = props.rating
  const [status, setStatus] = useState("");



  const loadStatus = ()=>{
    switch (rating.status) {
      case 0:{
          setStatus("Đã xóa")
          break;
      }
      case 1:{
          setStatus("Chưa xem")
          break;
      }
      case 2:{
          setStatus("Đã xem")
          break;
      }
      
      default:
        break;
    }
  }

  useEffect(() => {
    loadStatus()
  }, [props,  params]);
  
  
  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover={true}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <i className='bx bx-chevron-up _iconBase' />: <i className='bx bx-chevron-down _iconBase'/>}
          </IconButton>
        </TableCell>
        <TableCell>{rating.userInfo.firstName + " " + rating.userInfo.lastName}</TableCell>
        <TableCell align="left">{rating.model.name}</TableCell>
        <TableCell align="center">{rating.userInfo.email}</TableCell>
        <TableCell align="center"><Rating name="Read only" value={rating.rating} readOnly /></TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{formatDate(rating.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(rating.timeUpdate)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Nội dung đánh giá
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                {(rating.content)?
                ((rating.content.trim()==="")?"Không có nội dung":rating.content):
                "Không có nội dung"}
              </Typography>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
