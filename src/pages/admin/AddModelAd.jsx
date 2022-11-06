import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import imageAvatar from '../../assets/images/default/438x438.jpg'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import categoriesService from '../../service/categoriesService';
import sizeService from '../../service/sizeService';
import productModelService from '../../service/productModelService';



const AddModelAd = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState(undefined);
  const [listPreview, setListPreview] = useState(null);
  const [sizes, setSizes] = useState(undefined);

  const setInputImage = useCallback((e)=>{
      
  },[])

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    let formData = new FormData(document.getElementById('formAddModel'));
    productModelService.insertWithProducts(formData)
                        .then((response)=>{
                          console.log(response.data.result);
                          swal({
                            title: "Thành  công",
                            icon: "success",
                            button: "Về trang Admin"
                            })
                        .then(( value ) =>  { 
                          navigate("/admin")
                        } ) ;
                        })
                        .catch((error)=>{
                          console.log(error);
                            
                        });
  },[])

  const loadCategories = useCallback(()=>{
    categoriesService.getAll()
        .then((response)=>{
          console.log(response.data.result);
          setCategories(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        });
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

  useEffect(() => {
    loadCategories();
    loadSizes();
  }, []);

  // useEffect(() => {
  //   loadmodels()
  // }, []);
  

  return (     
    <div className='_ad-lists-model'>
      <form onSubmit={handleSubmit} id="formAddModel" enctype="multipart/form-data">
        {/* phần insert model */}
        <Box sx={{ flexGrow: 1 ,
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }} >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={5}>
                    <TextField
                      required
                      name="modelName"
                      label="Tên mẫu sản phẩm"
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                      label="Giá gốc"
                      type="number"
                      name='priceRoot'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                      required
                      name="description"
                      label="Mô tả"
                    />
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth sx={{ maxWidth: 410, marginLeft: 1, marginTop:1 }}>
                      <InputLabel id="categoryID">Loại sản phẩm</InputLabel>
                      <Select
                        fullWidth
                        name='categoriesID'
                        labelId="categoryID"
                        label="Loại sản phẩm"
                      >
                        {
                          (categories)?categories.map((item,  index)=>(
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          )):null
                        }
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              
              <Stack spacing={2} direction="row">
                <Button variant="outlined" id="btnAvatar"> Chọn hình ảnh </Button>
                  <input
                    id="inputAvatar"
                      name="images"
                      type="file"
                      onChange={setInputImage}
                      multiple
                  />
                    {listPreview}
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {/* phần insert product */}
        <Box sx={{ flexGrow: 1, marginTop:3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  {/* <Button variant="outlined" id="btnAvatar">Chọn Avatar</Button> */}
                  <input
                    id="inputAvatar"
                      name="fileAvatar"
                      type="file"
                      onChange={setInputImage}
                      
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    required
                    name="productName"
                    label="Tên sản phẩm"
                  />
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth sx={{ maxWidth: 410, marginLeft: 1, marginTop:1 }}>
                      <InputLabel id="saleType1">Cách tính giá</InputLabel>
                      <Select
                        fullWidth
                        name='saleType'
                        labelId="saleType"
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
                <Grid item xs={5}>
                    <TextField
                      label="Giảm"
                      type="number"
                      name='priceSale'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </Grid>
                <Grid item xs={5}>
                    <FormControl fullWidth sx={{ maxWidth: 410, marginLeft: 1, marginTop:1 }}>
                      <InputLabel id="sizeID1">Chọn kích thước</InputLabel>
                      <Select
                        fullWidth
                        name='sizeID'
                        labelId="sizeID1"
                        label="Chọn kích thước"
                      >
                        {
                          (sizes)?sizes.map((item,  index)=>(
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          )):null
                        }
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                      label="Số lượng"
                      type="number"
                      name='quantity'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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

export default AddModelAd





