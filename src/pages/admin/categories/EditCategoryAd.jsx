import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import categoriesService from '../../../service/categoriesService';
import swalErrorAPI from '../../../utils/swalErrorAPI';



const EditCategoryAd = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [categories, setCategories] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const parentCategoriesId = document.getElementById('parentCategoriesId').value;

    categoriesService.update(category.id, name, description, parentCategoriesId)
    .then((response)=>{
        swal({
            title: "Thành  công",
            icon: "success",
            button: "Về trang danh sách"
        })
        .then(( value ) =>  { 
          navigate("/admin/categories")
        });
    })
    .catch((error)=>{
      swalErrorAPI(error)
        
    });
}

  const loadCategories = useCallback(()=>{
    categoriesService.getAll()
        .then((response)=>{
          let list = response.data.result;
          console.log(list);
          for (const i in list) {
            console.log(list[i].id + ' - ' + params.id);
            if (list[i].id === Number.parseInt(params.id)) {
              setCategory(list[i]);
              list.splice(i, 1);
              break;
            }
          }
          setCategories(list)
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
      {
        (categories && category)?
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box sx={{ flexGrow: 1 ,
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }} >
              <Grid container spacing={1}>
                <Grid item xs={5}>
                    <TextField
                      id="name"
                      required
                      defaultValue={category.name}
                      name="name"
                      label="Tên Loại sản phẩm"
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                      id="description"
                      defaultValue={category.description}
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
                        defaultValue={(category.parentCategoriesId)?category.parentCategoriesId:'null'}
                        name='parentCategoriesId'
                        id='parentCategoriesId'
                        labelId="categoryID"
                        label="Loại sản phẩm"
                      >
                        <MenuItem value={"null"}>Không có</MenuItem>
                        {
                          categories.map((item,  index)=>(
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <TextField
                id="id"
                disabled
                name="id"
                value={category.id}
                label="Tên Loại sản phẩm"
              />
            </Grid>
        </Grid>
        :null
      }
           
        
        
        <div className='_submit-add-model'>
          <Button type='submit' variant="outlined" >Add</Button>
        </div>
        
      
      </form>
    </div>
  )
}

export default EditCategoryAd





