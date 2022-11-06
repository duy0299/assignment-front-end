import React, { useCallback, useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import swal from 'sweetalert';
import formatDate from '../../utils/formatDate';
import sizeService from '../../service/sizeService';



const ListSizeAd = () => {
  const [sizes, setSizes] = useState(undefined);

  const loadUsers = useCallback(()=>{
    sizeService.getAll()
        .then((response)=>{
          setSizes(response.data.result)
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
      <h1>Danh Sách Kích Thước</h1>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Ngày cập nhật gần nhất</TableCell>
              <TableCell align="left">Shỉnh Sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              (sizes)?sizes.map((item, index)=>(

                <RowTable size={item} key={index}  stt={index} />
              )):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListSizeAd



const RowTable = (props) => {
  

  const [size, setSize] = useState(props.size);

  useEffect(() => {
    setSize(props.size)
    
  }, []);
  
  
  return (     
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.key}>
        <TableCell>{props.stt+1}</TableCell>
        <TableCell align="left">{size.name}</TableCell>
        <TableCell align="center">{(size.status)?"Bình thường":"Ngừng sử dụng"}</TableCell>
        <TableCell align="center">{formatDate(size.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(size.timeUpdate)}</TableCell>
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
