import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import imageAvatar from '../../../assets/images/default/438x438.jpg'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import sizeService from '../../../service/sizeService';
import productModelService from '../../../service/productModelService';
import addAvatar from '../../../utils/addAvatar';
import productService from '../../../service/productService';
import swalErrorAPI from '../../../utils/swalErrorAPI';



const AddProductsAd = () => {
  const param = useParams();
  const navigate = useNavigate()
  const [sizes, setSizes] = useState(undefined);
  const [models, setModels] = useState(undefined);
  // count product in model
  const [count, setCount] = useState(0);

  const loadModel = useCallback(()=>{
    productModelService.getAll()
        .then((response)=>{
          console.log(response.data.result);
          setModels(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[])

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

  const handleSubmit = (e)=>{
    e.preventDefault();
    let formData = new FormData(document.getElementById('formAddProduct'));
    productService.insert(formData)
    .then((response)=>{
      console.log(response.data.result);
      swal({
        title: "Thành  công",
        icon: "success",
        button: "Về trang danh sách"
      })
      .then(( value ) =>  { 
        navigate("/admin/products/page/1")
      });
    })
    .catch((error)=>{
      console.log(error);
      swalErrorAPI(error) 
    });
  }




  useEffect(() => {
    loadSizes();
    loadModel();
    addAvatar("btnAvatar-"+count, "inputAvatar-"+count, 'imgAvatar-'+count);
    // addImages('btnImages', 'inputImages', 'divImages')
  }, []);

  // useEffect(() => {
  //   loadmodels()
  // }, []);
  

  return (     
    <div className='_ad-lists-model'>
      <form onSubmit={handleSubmit} id="formAddProduct" enctype="multipart/form-data">
      <Grid container spacing={0}>
        <Grid item xs={4}/>
        <Grid item xs={4}>
          <div className='modelID-add-product'>
            <FormControl fullWidth sx={{ maxWidth: 400, marginLeft: 1, marginTop:1 }}>
              <InputLabel id={"modelID"}>Chọn Mẫu</InputLabel>
              <Select
                fullWidth
                name={'modelID'}
                labelId={"modelID"}
                label="Chọn kích thước"
              >
                {
                  (models)?models.map((item,  index)=>(
                    <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                  )):null
                }
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
            
        
        
        {/* phần insert product */}
        <Box sx={{ flexGrow: 1, marginTop:3 }}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                    <input
                      id={"inputAvatar-"+count}
                        name="fileAvatar"
                        type="file"
                        hidden
                    />
                    <img id={'imgAvatar-'+count} src={imageAvatar} alt="" width='100%' />
                    <div className='_btnAvatar'>
                      <Button variant="outlined"  id={"btnAvatar-"+count}>Chọn Avatar</Button>
                    </div>
                </Grid>
                <Grid item xs={7}>
                  <div className='_textFieldModelAdd'>
                    <TextField
                      fullWidth 
                      required
                      name="name"
                      label="Tên sản phẩm"
                    /><br/><br/>
                    <TextField
                        fullWidth 
                        label="Giá thây đổi"
                        type="number"
                        name='priceSale'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /><br/><br/>
                      <TextField
                        label="Số lượng"
                        fullWidth 
                        type="number"
                        name='quantity'
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /><br/>
                  </div>
                  <FormControl fullWidth sx={{ maxWidth: 400, marginLeft: 1, marginTop:1 }}>
                    <InputLabel id={"sizeID"+count}>Chọn kích thước</InputLabel>
                    <Select
                      fullWidth
                      name='sizeID'
                      labelId={"sizeID"+count}
                      label="Chọn kích thước"
                    >
                      {
                        (sizes)?sizes.map((item,  index)=>(
                          <MenuItem value={item.id}  key={index}>{item.name}</MenuItem>
                        )):null
                      }
                    </Select>
                  </FormControl><br/>
                  <FormControl fullWidth sx={{ maxWidth: 400, marginLeft: 1, marginTop:1 }}>
                    <InputLabel id={"saleType"+count}>Cách tính giá</InputLabel>
                    <Select
                      fullWidth
                      name='saleType'
                      labelId={"saleType"+count}
                      label="Chọn kích thước"
                    >
                      <MenuItem value="direct">Giảm trực tiếp</MenuItem>
                      <MenuItem value="percent">Giảm theo phần trăm</MenuItem>
                      <MenuItem value="add">Tăng trực tiếp</MenuItem>
                      <MenuItem value="not">Giá gốc</MenuItem>
                    </Select>
                    <FormHelperText>dựa vào giá gốc, tỷ lệ giảm và Cách tính giá để tính ra giá sản phẩm </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <div className='_submit-add-model'>
          <Button type='submit' variant="outlined" >Add</Button>
        </div>
        
      
      </form>
    </div>
  )
}

export default AddProductsAd





