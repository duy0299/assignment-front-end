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

import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SpeedDial, SpeedDialAction} from '@mui/material';
import formatDate from '../../utils/formatDate';
import feedbackService from '../../service/feedbackService';
import swalErrorAPI from '../../utils/swalErrorAPI';

const actions = [
  { 
    icon: <i className='bx bx-station _bxs-base'/>, 
    name: 'Trạng thái', 
    link:"status" 
  },
  { 
    icon: <i className='bx bx-trash _bxs-base'/>, 
    name: 'Xóa', 
    link:"delete" 
  },
]


const ListFeedbackAd = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [feedbacks, setFeedbacks] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(params.page);
    const [totalPage, setTotalPage] = useState(1);

  const loadFeedbacks = useCallback(()=>{
    feedbackService.getAll(currentPage)
        .then((response)=>{
          console.log(response.data.result);
          setFeedbacks(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error) 
        })
  },[currentPage])



  useEffect(() => {
    
    loadFeedbacks()
  }, [currentPage]);

  // useEffect(() => {
  //   loadmodels()
  // }, []);
  

  return (     
    <div className='_ad-lists-model'>
      <h1>Danh sách Thư phản hồi</h1>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination  count={totalPage} color="primary" 
                defaultValue={currentPage} 
                onChange={(e, value)=>{
                  setCurrentPage(value)
                  params.page =value;
                  navigate(`/admin/feedbacks/page/${value}`)
                }
               }
            />
          </Stack>
          
        </div>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Xem nội dung</TableCell>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="left">Tên Người gửi</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Ngày Tạo</TableCell>
              <TableCell align="center">Ngày cập nhật</TableCell>
              <TableCell align='center'>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (feedbacks)?feedbacks.map((item, index)=>{
                return <RowTableDescription feedback={item} key={index} stt={index} reload={loadFeedbacks}/>
                
              }):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListFeedbackAd


// Row
const RowTableDescription = (props) => {

    const params = useParams();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const feedback = props.feedback
    const [status, setStatus] = useState({
      code:1,
      text: ""
    });
    
    const loadStatus = useCallback(()=>{
      switch (feedback.status) {
        case 0:{
            setStatus({
              code: 0,
              text: "Thư rác"
            })
            break;
        }
        case 1:{
            setStatus({
              code: 1,
              text: "Chưa xem"
            })
            break;
        }
        case 2:{
            setStatus({
              code: 2,
              text: "Đã xem"
            })
            break;
        }
        
        default:
          break;
      }
    }, [feedback, params])
    
    const handleClose = () => {
      setOpenDialog(false);
    };
    const handleSubmitStatus = () => {
      let radio = document.getElementsByName('status')
      for(let i in radio){
        if(radio[i].checked === true){
          feedbackService.updateStatus(feedback.id, radio[i].value)
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
    };
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
          swal("Đã xóa", {
            icon: "success",
          });
          feedbackService.delete(feedback.id)
          .then((response)=>{
            props.reload()
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
    };

  useEffect(() => {
    loadStatus()
  }, [props,  params]);
  
  
  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <i className='bx bx-chevron-up _iconBase' />: <i className='bx bx-chevron-down _iconBase'/>}
          </IconButton>
        </TableCell>
        <TableCell align="left">{props.stt}</TableCell>
        <TableCell component="th" scope="row" align="center"><Avatar alt="avatar" src={feedback.userInfo.avatar} /></TableCell>
        <TableCell align="left">{feedback.userInfo.firstName +" " +feedback.userInfo.lastName}</TableCell>
        <TableCell align="center">{feedback.userInfo.email}</TableCell>
        <TableCell align="center"><p className={"_status-"+status.code}>{status.text}</p></TableCell>
        <TableCell align="center">{formatDate(feedback.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(feedback.timeUpdate)}</TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Nôi dung của thư
              </Typography>
              <p>
              {feedback.content}  
              </p>
              
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
                    <FormControlLabel name='status' value={0} control={<Radio />} label="Thư rác" />
                    <FormControlLabel name='status' value={1} control={<Radio />} label="Chưa xem" />
                    <FormControlLabel name='status' value={2} control={<Radio />} label="Đã xem" />
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


