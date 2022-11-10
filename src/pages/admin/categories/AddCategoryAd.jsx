import React, { useCallback, useEffect, useState } from 'react'
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import categoriesService from '../../../service/categoriesService';
import swalErrorAPI from '../../../utils/swalErrorAPI';



const AddCategoryAd = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(undefined);

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const parentCategoriesId = document.getElementById('parentCategoriesId').value;

    categoriesService.insert(name, description, parentCategoriesId)
    .then((response)=>{
      console.log(response.data.result);
      swal({
        title: "Thành  công",
        icon: "success",
        button: "Về trang danh sách"
        })
    .then(( value ) =>  { 
      navigate("/admin/categories")
    } ) ;
    })
    .catch((error)=>{
      swalErrorAPI(error)
        
    });
  }

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

  useEffect(() => {
    loadCategories();
  }, []);


  return (     
    <div className='_ad-lists-model'>
      <form onSubmit={handleSubmit}  enctype="multipart/form-data">
        {/* phần insert categories */}
        <Box sx={{ flexGrow: 1 ,
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }} >
          <Grid container spacing={1}>
            <Grid item xs={5}>
                <TextField
                  id="name"
                  required
                  name="name"
                  label="Tên Loại sản phẩm"
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                  id="description"
                  required
                  name="description"
                  label="Mô tả"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth sx={{ maxWidth: 410, marginLeft: 1, marginTop:1 }}>
                  <InputLabel id="categoryID">Loại Cấp trên</InputLabel>
                  <Select
                    fullWidth
                    defaultValue={"null"}
                    name='parentCategoriesId'
                    id='parentCategoriesId'
                    labelId="categoryID"
                    label="Loại sản phẩm"
                  >
                    <MenuItem value={"null"}>Không có</MenuItem>
                    {
                      (categories)?categories.map((item,  index)=>(
                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                      )):null
                    }
                  </Select>
                </FormControl>
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

export default AddCategoryAd





