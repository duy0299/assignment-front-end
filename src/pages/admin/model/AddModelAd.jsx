import React, { useCallback, useEffect, useState } from 'react'
import imageAvatar from '../../../assets/images/default/438x438.jpg'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import categoriesService from '../../../service/categoriesService';
import sizeService from '../../../service/sizeService';
import productModelService from '../../../service/productModelService';
import addAvatar from '../../../utils/addAvatar';
// import addImages from '../../../utils/addImages';
import swalErrorAPI from '../../../utils/swalErrorAPI';



const AddModelAd = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(undefined);
  const [sizes, setSizes] = useState(undefined);
  
  // count product in model
  const [count, setCount] = useState(0);



  const handleSubmit = (e)=>{
    e.preventDefault();
    let formData = new FormData(document.getElementById('formAddModel'));
    productModelService.insertWithProducts(formData)
    .then((response)=>{
      swal({
        title: "Thành  công",
        icon: "success",
        button: "Về trang danh sách"
        })
    .then(( value ) =>  { 
      navigate("/admin/models/page/1")
    } ) ;
    })
    .catch((error)=>{
      console.log(error);
      swalErrorAPI(error)
    });
  }

  const loadCategories = useCallback(()=>{
    categoriesService.getAll()
        .then((response)=>{
          setCategories(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error)
        });
  },[])
  const loadSizes = useCallback(()=>{
    sizeService.getAll()
        .then((response)=>{;
          setSizes(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error)
        })
  },[])

 

  useEffect(() => {
    loadCategories();
    loadSizes();
    addAvatar("btnAvatar-"+count, "inputAvatar-"+count, 'imgAvatar-'+count);
    // addImages('btnImages', 'inputImages', 'divImages')
  }, []);


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
                <Button variant="outlined" id="btnImages" onClick={(e)=>{document.getElementById('inputImages').click()}}> Chọn hình ảnh </Button>
                  <input
                    id="inputImages"
                      name="images"
                      type="file"
                      // hidden
                      multiple
                  />
                    <div id='divImages'></div>
              </Stack>
            </Grid>
          </Grid>
        </Box>
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
                      name="productName"
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
                    </FormControl><br/>
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





