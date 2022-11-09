import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Avatar} from '@mui/material';
import formatDate from '../../../utils/formatDate';
import formatVND from '../../../utils/formatVND';
import numberWithCommas from '../../../utils/numberWithCommas';
import productService from '../../../service/productService';



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
                  navigate(`/admin/products/page/${value}`)
                }
               }
            />
          </Stack>
          
        </div>
       <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
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
    </React.Fragment>
  )
}
