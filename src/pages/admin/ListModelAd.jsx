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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Avatar, PaginationItem, Rating } from '@mui/material';
import formatDate from '../../utils/formatDate';
import productModelService from '../../service/productModelService';
import formatVND from '../../utils/formatVND';
import numberWithCommas from '../../utils/numberWithCommas';



const ListModelAd = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [models, setModels] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(params.page);
    const [totalPage, setTotalPage] = useState(1);

  const loadModels = useCallback(()=>{
    productModelService.getAll(currentPage)
        .then((response)=>{
          setModels(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[currentPage])



  useEffect(() => {
    
    loadModels()
  }, [currentPage]);

  // useEffect(() => {
  //   loadmodels()
  // }, []);
  

  return (     
    <div className='_ad-lists-model'>
      <h1>Danh sách Mẫu sản phẩm</h1>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination  count={totalPage} color="primary" 
                defaultValue={currentPage} 
                onChange={(e, value)=>{
                    setCurrentPage(value)
                    params.page =value;
                    navigate(`/admin/models/list/${value}`)
                }
               }
              
            />
          </Stack>
          
        </div>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Avatar</TableCell>
              <TableCell align="left">Tên Mẫu</TableCell>
              <TableCell align="center">Thuộc Loại</TableCell>
              <TableCell align="center">Gía Gốc</TableCell>
              <TableCell align="center">Kích Thước</TableCell>
              <TableCell align="center">Đánh Giá</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Ngày Tạo</TableCell>
              <TableCell align="center">Ngày cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (models)?models.map((item, index)=>{
                return <RowTableDescription model={item} key={index} />
                
              }):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListModelAd



const RowTableDescription = (props) => {
    const params = useParams();
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(props.model);
  const [start, setStart] = useState(0);

  const loadStart = useCallback(()=>{
    if(model.listRating.length === 0){
        setStart(0)
    }else{
        let sum = 0;
        for (const item of model.listRating) {
            sum +=item.rating;
        }
       
        setStart(sum/model.listRating.length);
    }
      
  }, [model, params])

  useEffect(() => {
    loadStart()
    setModel(props.model)
  }, [model,  params]);
  
  
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
        <TableCell component="th" scope="row" align="center"><Avatar alt="avatar" src={model.listImages[0]} /></TableCell>
        <TableCell>{model.name}</TableCell>
        <TableCell align="center">{model.categories.name}</TableCell>
        <TableCell align="center">{formatVND(numberWithCommas(model.priceRoot) ) }</TableCell>
        <TableCell align="center">
            {
                (model.listProduct.length===0)?"chưa có kích thước": model.listProduct.map((item, index)=>(
                    (index === 0)?item.size.name: ', '+item.size.name
                ))
            }
        </TableCell>
        <TableCell align="center"><Rating name="Read only" value={start} readOnly /></TableCell>
        <TableCell align="center">{(model.status)?"Bình thường":"Ngừng bán"}</TableCell>
        <TableCell align="center">{formatDate(model.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(model.timeUpdate)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Thống Kê
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Lượt Yêu Thích <span> </span><i className='bx bxs-heart'></i> </TableCell>
                    <TableCell align="center">Lượt đánh giá <span> </span><i className='bx bxs-star'></i></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" > {model.listWishlist.length}</TableCell>
                    <TableCell  align="center">{model.listRating.length}</TableCell>
                    
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
