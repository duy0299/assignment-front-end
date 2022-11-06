import React, { useCallback, useEffect, useState } from 'react'
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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import userService from '../../service/userService';
import swal from 'sweetalert';
import { Avatar, PaginationItem } from '@mui/material';
import formatDate from '../../utils/formatDate';



const ListUserAd = () => {
  const params = useParams();
  const [users, setUsers] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(params.page);
  const [totalPage, setTotalPage] = useState(1);

  const loadUsers = useCallback(()=>{
    console.log(currentPage);
    userService.getByPage(currentPage)
        .then((response)=>{
          console.log(response.data);
          setUsers(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[currentPage])



  useEffect(() => {
    
    loadUsers()
  }, [currentPage]);

  // useEffect(() => {
  //   loadUsers()
  // }, []);
  

  return (     
    <div className='_ad-lists-user'>
      <h1>Danh sách Users</h1>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination page={currentPage} count={totalPage} color="primary" 
               onChange={(e, value)=>{
                  setCurrentPage(value)
                  params.page =value;
                }
               }
               
              
              renderItem={(item) => {
                
                return(
                    <PaginationItem
                      
                      component={Link}
                      to={`/admin/users/list/${item.page}`}
                      {...item}
                    />
                )    
              }}
            />
          </Stack>
          
        </div>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="left">Họ và Tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Giới tình</TableCell>
              <TableCell align="center">Số diện thoại</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Ngày cập nhật gần nhất</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (users)?users.map((item, index)=>(

                <RowTableHistory user={item} key={index} />
              )):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListUserAd



const RowTableHistory = (props) => {
  
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    
    setUser(props.user)
  }, [props]);
  
  
  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.key}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center"><Avatar alt="Remy Sharp" src={user.avatar} /></TableCell>
        <TableCell>
          {user.firstName + " " + user.lastName}
        </TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.gender}</TableCell>
        <TableCell align="center">{user.phoneNumber}</TableCell>
        <TableCell align="center">{(user.status)?"Bình thường":"Bị Cấm"}</TableCell>
        <TableCell align="center">{formatDate(user.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(user.timeUpdate)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Lịch Sử
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Đơn đã đặt</TableCell>
                    <TableCell align="center">Thư phản hồi</TableCell>
                    <TableCell align="center">Lượt đánh giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" > {user.listOrder.length} </TableCell>
                    <TableCell  align="center">{user.listFeedbacks.length}</TableCell>
                    <TableCell align="center">{user.listRatings.length}</TableCell>
                    
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
