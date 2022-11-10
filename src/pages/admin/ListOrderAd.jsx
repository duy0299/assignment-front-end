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
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import formatDate from '../../utils/formatDate';
import formatVND from '../../utils/formatVND';
import numberWithCommas from '../../utils/numberWithCommas';
import orderService from '../../service/orderService';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SpeedDial, SpeedDialAction } from '@mui/material';
import swalErrorAPI from '../../utils/swalErrorAPI';

const actions = [
  { 
    icon: <i className='bx bx-station _bxs-base'></i>, 
    name: 'Trạng thái', 
    link:"status" 
  },
  { 
    icon: <i className='bx bx-trash _bxs-base'/>, 
    name: 'Xóa', 
    link:"delete" 
  },
]

const statusRadio = [
  { 
    name: 'Huỷ đơn', 
    value:0 
  },
  { 
    name: 'chưa xác nhận', 
    value:1 
  },
  { 
    name: 'đã xác nhận', 
    value:2 
  },
  { 
    name: 'đã thanh toán', 
    value:3 
  },
  { 
    name: 'đã đóng gói', 
    value:4 
  },
  { 
    name: 'đang vận chuyển', 
    value:5
  },
  { 
    name: 'đã hoàn thành', 
    value:6
  },
]

const ListOrderAd = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [orders, setOrders] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(params.page);
    const [totalPage, setTotalPage] = useState(1);

  const loadOrders = useCallback(()=>{
    orderService.getAll(currentPage)
        .then((response)=>{
          setOrders(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error)
        })
  },[currentPage])



  useEffect(() => {
    
    loadOrders()
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
                  navigate(`/admin/orders/page/${value}`)
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
              <TableCell align="center">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (orders === undefined)?null:orders.map((item, index)=>{
                console.log(item);
                return <RowTableDescription order={item} key={index} reload={loadOrders}/>
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
  const params = useParams();
  const [open, setOpen] = useState(false);
  const order = props.order
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const loadTotal = useCallback(()=>{
    let sum = 0;
    for (const item of order.listItems) {
      
        sum +=(item.product.currentPrice * item.quantity);
    }
    setTotal(sum);
  }, [order, params])

  const handleDelete = ()=>{
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
        orderService.delete(order.id)
        .then((response)=>{
          props.reload()
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
  }
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleSubmitStatus = () => {
    let radio = document.getElementsByName('status')
    let flat = true;
    for(let i in radio){
      if(radio[i].checked === true){
        flat = false;
        orderService.updateStatus(order.id, radio[i].value)
        .then((response)=>{
          props.reload()
          setOpenDialog(false);
          swal("Đã cập nhật Trạng thái thành công", "", "success");
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error)
        })
      }
    }
    if(flat){swal("chú ý", "Chưa chọn trạng thái mới", "warning")}
  };


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
            {open ? <i className='bx bx-chevron-up _iconBase' />: <i className='bx bx-chevron-down _iconBase'/>}
          </IconButton>
        </TableCell>
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
                          case "status":{
                            setOpenDialog(true);
                            break;
                          }
                          default:
                           
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Mã Đơn hàng: {order.id}
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
          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Hãy chọn trạng thái cần thay đổi"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Trạng thái</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {
                      statusRadio.map((item, index)=>(
                        <FormControlLabel key={index} name='status' value={item.value} control={<Radio />} label={item.name} />
                      ))
                    }
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Quay lại</Button>
              <Button onClick={handleSubmitStatus} >Xác nhận</Button>
            </DialogActions>
          </Dialog>
    </React.Fragment>
  )
}
