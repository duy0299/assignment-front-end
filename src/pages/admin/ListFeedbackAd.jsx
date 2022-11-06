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
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Avatar} from '@mui/material';
import formatDate from '../../utils/formatDate';
import formatVND from '../../utils/formatVND';
import numberWithCommas from '../../utils/numberWithCommas';
import feedbackService from '../../service/feedbackService';



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
                  navigate(`/admin/feedbacks/list/${value}`)
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
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (feedbacks)?feedbacks.map((item, index)=>{
                return <RowTableDescription feedback={item} key={index} stt={index}/>
                
              }):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListFeedbackAd



const RowTableDescription = (props) => {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState(props.feedback);
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

  useEffect(() => {
    setFeedback(props.feedback)
    loadStatus()
  }, [props.feedback,  params]);
  
  
  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{props.stt}</TableCell>
        <TableCell component="th" scope="row" align="center"><Avatar alt="avatar" src={feedback.userInfo.avatar} /></TableCell>
        <TableCell align="left">{feedback.userInfo.firstName +" " +feedback.userInfo.lastName}</TableCell>
        <TableCell align="center">{feedback.userInfo.email}</TableCell>
        <TableCell align="center"><p className={"_status-"+status.code}>{status.text}</p></TableCell>
        <TableCell align="center">{formatDate(feedback.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(feedback.timeUpdate)}</TableCell>
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
    </React.Fragment>
  )
}


