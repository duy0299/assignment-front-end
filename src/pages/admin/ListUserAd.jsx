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
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../../service/userService';
import swal from 'sweetalert';
import { Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, PaginationItem, Radio, RadioGroup, SpeedDial, SpeedDialAction } from '@mui/material';
import formatDate from '../../utils/formatDate';


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
  { 
    icon: <i className='bx bxs-share-alt _bxs-base'></i>, 
    name: 'phân quyền', 
    link:"role" 
  },
]

const role = [
  {
    name:'BAN',
    label: 'Cấm'
  },
  // {
  //   name:'ADMIN',
  //   label: 'Admin'
  // },
  {
    name:'USER',
    label: 'User'
  },
  {
    name:'BAN_COMMENT',
    label: 'Cấm comment'
  },
  {
    name:'FEEDBACK_MANAGER',
    label: 'quản lý thư'
  },
  {
    name:'WAREHOUSE_MANAGER',
    label: 'Quản lý kho'
  },
  {
    name:'USER_MANAGER',
    label: 'Quản lý User'
  },
  {
    name:'ORDER_MANAGER',
    label: 'Quản lý đơn'
  },
]


const ListUserAd = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [users, setUsers] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(params.page);
  const [totalPage, setTotalPage] = useState(1);

  const loadUsers = useCallback(()=>{
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
                  navigate(`/admin/users/page/${value}`)
                }
               }
              
            />
          </Stack>
          
        </div>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Thống kê</TableCell>
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="left">Họ và Tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Giới tình</TableCell>
              <TableCell align="center">Số diện thoại</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Ngày cập nhật gần nhất</TableCell>
              <TableCell align="right">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (users)?users.map((item, index)=>(

                <RowTableHistory user={item} key={index} reLoad={loadUsers}/>
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
  const [openDialogStatus, setOpenDialogStatus] = useState(false);
  const [openDialogRole, setOpenDialogRole] = useState(false);

  const handleChangeStatus = () => {
    let radio = document.getElementsByName('status')
    for(let i in radio){
      if(radio[i].checked === true){
        userService.updateStatus(user.id, radio[i].value)
        .then((response)=>{
          props.reLoad()
          swal("Đã cập nhật Trạng thái thành công", "", "success");
        })
        .catch((error)=>{
          console.log(error);
          swal("Lỗi", "", "error");
        })
      }
    }
  };

  const handleChangeRole = () => {
    let checkBox = document.getElementsByName('role')
    let valueRole = [];
    for(let i in checkBox){
      if(checkBox[i].checked === true){
        valueRole.push(checkBox[i].value)
      }
    }
    if(valueRole.length >  0){
      userService.updateRoles(user.id, valueRole)
        .then((response)=>{
          props.reLoad()
          swal("Đã cập nhật phân quyền thành công", "", "success");
        })
        .catch((error)=>{
          console.log(error);
          swal("Lỗi", "", "error");
        })
    }
    console.log(valueRole);
  };

  const handleCloseDialogStatus = () => {
    setOpenDialogStatus(false);
  };
  const handleCloseDialogRole = () => {
    setOpenDialogRole(false);
  };

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
            {open ? <i className='bx bx-chevron-up _iconBase' />: <i className='bx bx-chevron-down _iconBase'/>}
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
        <TableCell align='center'>
          <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', right: 5, top: 0 }}
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
                            swal({
                              title: "Chú ý",
                              text: "Bạn có chắc chắn muốn xóa không",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            })
                            .then((willDelete) => {
                              if (willDelete) {
                                props.reLoad()
                                swal("Đã xóa", {
                                  icon: "success",
                                });
                                userService.delete(user.id)
                                .then((response)=>{
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
                          case "status":{
                            setOpenDialogStatus(true);
                            break;
                          }
                          case 'role':{
                            setOpenDialogRole(true)
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
          <Dialog
            open={openDialogStatus}
            onClose={handleCloseDialogStatus}
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
                    <FormControlLabel name='status' value={true} control={<Radio />} label="Bình thường" />
                    <FormControlLabel name='status' value={false} control={<Radio />} label="Ngừng sử dụng" />
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogStatus}>Quay lại</Button>
              <Button onClick={handleChangeStatus} >Xác nhận</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDialogRole}
            onClose={handleCloseDialogRole}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Hãy chọn lại phân quyền cho User này"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                      <FormGroup>
                        <Grid container spacing={3}>
                          {
                            role.map((item, index)=>(
                              <Grid item xs={5} key={index}>
                                <FormControlLabel  control={<Checkbox name='role' value={item.name} />} label={item.label} />
                              </Grid>
                            ))
                          }
                        </Grid>
                      </FormGroup>
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogRole}>Quay lại</Button>
              <Button onClick={handleChangeRole} >Xác nhận</Button>
            </DialogActions>
          </Dialog>
    </React.Fragment>
  )
}

