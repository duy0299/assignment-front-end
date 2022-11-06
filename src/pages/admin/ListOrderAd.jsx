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
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import formatDate from '../../utils/formatDate';
import formatVND from '../../utils/formatVND';
import numberWithCommas from '../../utils/numberWithCommas';
import orderService from '../../service/orderService';



const ListOrderAd = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [orders, setOrders] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(params.page);
    const [totalPage, setTotalPage] = useState(1);

  const loadModels = useCallback(()=>{
    orderService.getAll(currentPage)
        .then((response)=>{
          setOrders(response.data.result)
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
      <h1>Danh sách Đơn đặt hàng</h1>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination  count={totalPage} color="primary" 
                defaultValue={currentPage} 
                onChange={(e, value)=>{
                  setCurrentPage(value)
                  params.page =value;
                  navigate(`/admin/orders/list/${value}`)
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
              <TableCell align="left">Mã đơn hàng</TableCell>
              <TableCell align="left">Người đặt</TableCell>
              <TableCell align="center">Số Điện thoại</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Ghi chú</TableCell>
              <TableCell align="center">Tổng tiền</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Ngày Tạo</TableCell>
              <TableCell align="center">Ngày cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (orders === undefined)?null:orders.map((item, index)=>{
                console.log(item);
                return <RowTableDescription order={item} key={index} />
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListOrderAd



const RowTableDescription = (props) => {
  console.log(props.order);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const order = props.order
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");

  const loadTotal = useCallback(()=>{
    let sum = 0;
    for (const item of order.listItems) {
      console.log(item);
        sum +=(item.product.currentPrice * item.quantity);
    }
    setTotal(sum);
  }, [order, params])


  const loadStatus = useCallback(()=>{
    switch (order.status) {
      case 0:{
          setStatus("Đơn bị hủy")
          break;
      }
      case 1:{
          setStatus("Chưa xác nhận")
          break;
      }
      case 2:{
          setStatus("Đã xác nhận")
          break;
      }
      case 3:{
          setStatus("Đã thanh toán")
          break;
      }
      case 4:{
          setStatus("Đã đóng gói")
          break;
      }
      case 5:{
          setStatus("Đang vận chuyển")
          break;
      }
      case 6:{
          setStatus("Đã hoàn thành")
          break;
      }
      
      default:
        break;
    }
  }, [order, params])

  useEffect(() => {
    loadTotal()
    loadStatus()
  }, [order,  params]);
  
  
  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover={true}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" title={order.id}>{order.id}</TableCell>
        <TableCell>{order.user.firstName + " " + order.user.lastName}</TableCell>
        <TableCell align="center">{order.user.phoneNumber}</TableCell>
        <TableCell align="center">{order.user.email}</TableCell>
        <TableCell align="center">{order.listItems.length}</TableCell>
        <TableCell align="center">{order.note}</TableCell>
        <TableCell align="center">{formatVND(numberWithCommas(total) ) }</TableCell>
        <TableCell align="center">{order.address}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{formatDate(order.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(order.timeUpdate)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Danh sách các sản phẩm trong đơn
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tên  </TableCell>
                    <TableCell align="center">Kích Thước</TableCell>
                    <TableCell align="center">Đơn giá 1 sản phẩm</TableCell>
                    <TableCell align="center">Số Lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {
                      (order.listItems)?order.listItems.map((item, index)=>(
                        <TableRow>
                          <TableCell size='medium' align="center" > {item.product.name}</TableCell>
                          <TableCell size='medium' align="center" > {item.product.size.name}</TableCell>
                          <TableCell size='medium' align="center" > {formatVND(numberWithCommas(item.product.currentPrice) ) }</TableCell>
                          <TableCell size='medium' align="center">{item.quantity}</TableCell>
                        </TableRow>
                      )): null
                    }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
