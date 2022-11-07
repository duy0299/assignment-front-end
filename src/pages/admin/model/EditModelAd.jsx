import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import categoriesService from '../../../service/categoriesService';
import productModelService from '../../../service/productModelService';



const EditModelAd = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [categories, setCategories] = useState(undefined);
  const [model, setModel] = useState(undefined);
  const [categoryID, setCategory] = useState(0);
  
  const loadModels = useCallback(()=>{
    productModelService.getById(params.id)
        .then((response)=>{
          setModel(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        })
  },[params])

  const loadCategories = useCallback(()=>{
    categoriesService.getAll()
        .then((response)=>{
          setCategories(response.data.result)
        })
        .catch((error)=>{
          console.log(error);
            
        });
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault();
    const name = document.getElementById('modelName').value;
    const description = document.getElementById('description').value;
    const priceRoot = document.getElementById('priceRoot').value;
    // const categoriesID = document.getElementById('categoriesID').value;
    productModelService.updateInfo(params.id, name, description, priceRoot, categoryID)
                        .then((response)=>{
                          console.log(response.data.result);
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
                          swal("Lỗi", " ", "error");
                        });
  }




  useEffect(() => {
    loadCategories();
    loadModels()
  }, []);


  return (     
    <div className='_ad-lists-model'>
      <form onSubmit={handleSubmit} id="formEditModel">
        {/* phần insert model */}
        <Box sx={{ flexGrow: 1 ,
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }} >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  {
                    (model)?
                    <TextField
                      required
                      id="modelName"
                      defaultValue={(model)?model.name:''}
                      // placeholder={(model)?model.name:''}
                      name="modelName"
                      label="Tên mẫu sản phẩm"
                    />:null
                  }

                    
                </Grid>
                <Grid item xs={5}>
                  {
                    (model)?
                    <TextField
                      label="Giá gốc"
                      defaultValue={(model)?model.priceRoot:''}
                      type="number"
                      id="priceRoot"
                      name='priceRoot'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />:null
                  }
                    
                </Grid>
                <Grid item xs={5}>
                  {
                    (model)?
                    <TextField
                      required
                      defaultValue={(model)?model.description:''}
                      id="description"
                      name="description"
                      label="Mô tả"
                    />:null
                  }
                    
                </Grid>
                <Grid item xs={5}>
                  {
                    (model)?
                    <FormControl fullWidth sx={{ maxWidth: 410, marginLeft: 1, marginTop:1 }}>
                      <InputLabel id="LabelCategory">Loại sản phẩm</InputLabel>
                      <Select
                        fullWidth
                        defaultValue={(model)?model.categories.id:''}
                        id="categoriesID"
                        name='categoriesID'
                        labelId="LabelCategory"
                        label="Loại sản phẩm"
                        onChange={(e)=>{setCategory(e.target.value)}}
                      >
                        {
                          (categories)?categories.map((item,  index)=>(
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                          )):null
                        }
                      </Select>
                    </FormControl>:null
                  }
                    
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
                <TextField
                  disabled
                  label="ID của Mẫu"
                  value={(model)?model.id:''}
                  name='priceRoot'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
             
            </Grid>
          </Grid>
        </Box>
        <div className='_submit-add-model'>
          <Button type='submit' variant="outlined" >Edit</Button>
        </div>
        
      
      </form>
    </div>
  )
}

export default EditModelAd





