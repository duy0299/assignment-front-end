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
import { Avatar} from '@mui/material';
import formatDate from '../../utils/formatDate';
import formatVND from '../../utils/formatVND';
import numberWithCommas from '../../utils/numberWithCommas';
import productService from '../../service/productService';



const ListProductAd = () => {
    const navigate = useNavigate()
    const params = useParams();
    const [products, setProducts] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(params.page);
    const [totalPage, setTotalPage] = useState(1);

  const loadProducts = useCallback(()=>{
    productService.getAll(currentPage)
        .then((response)=>{
          console.log(response.data.result);
          setProducts(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[currentPage])



  useEffect(() => {
    
    loadProducts()
  }, [currentPage]);

  // useEffect(() => {
  //   loadmodels()
  // }, []);
  

  return (     
    <div className='_ad-lists-model'>
      <h1>Danh sách Sản phẩm</h1>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination  count={totalPage} color="primary" 
                defaultValue={currentPage} 
                onChange={(e, value)=>{
                  setCurrentPage(value)
                  params.page =value;
                  navigate(`/admin/products/list/${value}`)
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
              <TableCell align="left">Tên sản phẩm</TableCell>
              <TableCell align="center">Thuộc Mẫu</TableCell>
              <TableCell align="center">Kích thước</TableCell>
              <TableCell align="center">Tồn kho</TableCell>
              <TableCell align="center">Đã bán</TableCell>
              <TableCell align="center">Giá hiện tại</TableCell>
              <TableCell align="center">Trạng Thái</TableCell>
              <TableCell align="center">Ngày Tạo</TableCell>
              <TableCell align="center">Ngày cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (products)?products.map((item, index)=>{
                return <RowTableDescription product={item} key={index} stt={index}/>
                
              }):null
            }
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default ListProductAd



const RowTableDescription = (props) => {
    const params = useParams();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(props.product);
  // const [start, setStart] = useState(0);

  // const loadStart = useCallback(()=>{
  //   if(product.listRating.length === 0){
  //       setStart(0)
  //   }else{
  //       let sum = 0;
  //       for (const item of model.listRating) {
  //           sum +=item.rating;
  //       }
       
  //       setStart(sum/model.listRating.length);
  //   }
      
  // }, [model, params])

  useEffect(() => {
    setProduct(props.product)
  }, [props.product,  params]);
  
  
  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.stt}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center"><Avatar alt="avatar" src={product.avatar} /></TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell align="center">{product.model.name}</TableCell>
        <TableCell align="center">{product.size.name}</TableCell>
        <TableCell align="center">{product.quantity}</TableCell>
        <TableCell align="center">{product.soldProductQuantity}</TableCell>
        <TableCell align="center">{formatVND(numberWithCommas(product.currentPrice) ) }</TableCell>
        
        <TableCell align="center">{(product.status)?"Bình thường":"Ngừng bán"}</TableCell>
        <TableCell align="center">{formatDate(product.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(product.timeUpdate)}</TableCell>
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
                    <TableCell align="center" > {'model.listWishlist.length'}</TableCell>
                    <TableCell  align="center">{'model.listRating.length'}</TableCell>
                    
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
