import React, { useCallback, useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert';

import formatDate from '../../utils/formatDate';
import sizeService from '../../service/sizeService';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, RadioGroup, SpeedDial, SpeedDialAction, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const actions = [
  { 
    icon: <i className='bx bx-info-circle _bxs-base'></i>, 
    name: 'Thông tin', 
    link:"name" 
  },
  { 
    icon: <i className='bx bx-trash _bxs-base'/>, 
    name: 'Xóa', 
    link:"delete" 
  }
]


const ListSizeAd = () => {
  const [sizes, setSizes] = useState(undefined);

  const loadSizes = useCallback(()=>{
    sizeService.getAll()
        .then((response)=>{
          console.log(response.data.result);
          setSizes(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[])

  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const handleChangeAdd = () => {
    const name = document.getElementById('nameSize').value;
    
    
    if(name.trim() !== "" && name.length <= 50){
      sizeService.insert(name)
        .then((response)=>{
          loadSizes()
          swal("Đã Thêm thành công", "", "success");
          setOpenDialogAdd(false)
        })
        .catch((error)=>{
          console.log(error);
          swal("Lỗi", "", "error");
        })
    }else{
      swal("Chú ý", "Chuỗi rỗng hoặc quá dài", "warning");
    }
    
  };

  const handleCloseDialogAdd = () => {
    setOpenDialogAdd(false);
  };


  useEffect(() => {
    
    loadSizes()
  }, []);

  // useEffect(() => {
  //   loadUsers()
  // }, []);
  

  return (     
    <div className='_ad-lists-user'>
      <h1>Danh Sách Kích Thước</h1>
      <Button variant="outlined" id="_inp-form-add" onClick={()=>{setOpenDialogAdd(true)}}> Thêm kích thước </Button>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="center">Sản phẩm Phụ thuộc</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Ngày cập nhật gần nhất</TableCell>
              <TableCell align="right">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              (sizes)?sizes.map((item, index)=>(

                <RowTable size={item} key={index} reload={loadSizes}  stt={index} />
              )):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
          <Dialog
            open={openDialogAdd}
            onClose={handleCloseDialogAdd}
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
                        <TextField id="nameSize" fullWidth label="Tên kích thước mới" variant="standard" />
                      </FormGroup>
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogAdd}>Quay lại</Button>
              <Button onClick={handleChangeAdd} >Xác nhận</Button>
            </DialogActions>
          </Dialog>
    </div>
  )
}

export default ListSizeAd



const RowTable = (props) => {
  
  const navigate = useNavigate()
  const [size, setSize] = useState(props.size);

  const handleChangeName = ()=>{
    swal("Nhập vào tên mới:", {
      content: "input",
    })
    .then((value) => {
      if(!value){return null}
      if(value.trim()!==""){
        sizeService.update(size.id, value)
        .then((response)=>{
          props.reload()
          swal("Đã đổi tên thành công", "", "success");
        })
        .catch((error)=>{
          console.log(error);
          swal("Lỗi", "", "error");
        })
      }
      
    });
  }

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
          sizeService.delete(size.id)
          .then((response)=>{
           props.reload()
            swal("Đã xóa",  '', 'success');
          })
          .catch(function (error) {
            swal("Lỗi", "", "error");
            console.log(error);
          })
        
        }
      });
  }

  useEffect(() => {
    setSize(props.size)
    
  }, [props]);
  
  
  return (     
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.key}>
        <TableCell>{props.stt+1}</TableCell>
        <TableCell align="left">{size.name}</TableCell>
        <TableCell align="center">{size.productDto.length}</TableCell>
        <TableCell align="center">{(size.status)?"Bình thường":"Ngừng sử dụng"}</TableCell>
        <TableCell align="center">{formatDate(size.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(size.timeUpdate)}</TableCell>
        <TableCell align='center'>
          <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', right: 25, top: 12 }}
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
                          case "name":{
                            handleChangeName()
                            break;
                          }
                          default:{

                            break;
                          }
                            
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
