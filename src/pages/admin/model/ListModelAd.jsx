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
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, Radio, RadioGroup, Rating, SpeedDial, SpeedDialAction } from '@mui/material';
import {useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import formatDate from '../../../utils/formatDate';
import productModelService from '../../../service/productModelService';
import formatVND from '../../../utils/formatVND';
import numberWithCommas from '../../../utils/numberWithCommas';
import swalErrorAPI from '../../../utils/swalErrorAPI';

const actions = [
  { 
    icon: <i className='bx bx-station _bxs-base'></i>, 
    name: 'Trạng thái', 
    link:"status" 
  },
  { 
    icon: <i className='bx bx-info-circle _bxs-base'></i>, 
    name: 'Thông tin', 
    link:"info" 
  },
  { 
    icon: <i className='bx bx-trash _bxs-base'/>, 
    name: 'Xóa', 
    link:"delete" 
  },
  { 
    icon: <i className='bx bx-image-alt _bxs-base'></i>, 
    name: 'hình ảnh', 
    link:"images" 
  },
]

const ListModelAd = () => {
  const navigate = useNavigate()
  const params = useParams();
  const [models, setModels] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(params.page);
  const [totalPage, setTotalPage] = useState(1);

  const loadModels = useCallback(()=>{
    productModelService.getByPage(currentPage)
        .then((response)=>{
          setModels(response.data.result)
          setTotalPage(response.data.totalPage)
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error);
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
      <Button onClick={()=>{navigate('/admin/model')}} variant="outlined" id="_inp-form-add"> Thêm Mẫu sản phẩm </Button>
        <div className='_pagination'>
          <Stack spacing={2}>
            <Pagination  count={totalPage} color="primary" 
                defaultValue={currentPage} 
                onChange={(e, value)=>{
                    setCurrentPage(value)
                    params.page =value;
                    navigate(`/admin/models/page/${value}`)
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
              <TableCell align="center">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (models)?models.map((item, index)=>{
                return <RowTableDescription model={item} key={index} reload={loadModels}/>
                
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
  const navigate = useNavigate();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const model = props.model
  const [start, setStart] = useState(0);
  const [images, setImages] = useState(model.listImages);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogImages, setOpenDialogImages] = useState(false);

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

  const handleSubmitStatus = () => {
    let radio = document.getElementsByName('status')
    for(let i in radio){
      if(radio[i].checked === true){
        productModelService.updateStatus(model.id, radio[i].value)
        .then((response)=>{
          props.reload()
          swal("Đã cập nhật Trạng thái thành công", "", "success");
        })
        .catch((error)=>{
          console.log(error);
          swalErrorAPI(error)
        })
      }
    }
  };

  const handleChangeImages = (e) => {
    e.preventDefault();
    let formData = new FormData(document.getElementById('formEditImage'));
    productModelService.updateImages(model.id, formData)
    .then((response)=>{
      swal({
        title: "Thành  công",
        icon: "success",
        })
    })
    .catch((error)=>{
      console.log(error);
      swalErrorAPI(error)
    });
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCloseDialogImages = () => {
    setOpenDialogImages(false);
  };
  useEffect(() => {
    loadStart()
  }, [props.model,  params]);



  

  return (     
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={props.key} hover={true}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <i className='bx bx-chevron-up _iconBase' />: <i className='bx bx-chevron-down _iconBase'/>}
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
        <TableCell align="center"  ><p className={(model.status)?'':'_status-0'}>{(model.status)?"Bình thường":"Ngừng bán"}</p></TableCell>
        <TableCell align="center">{formatDate(model.timeCreate) }</TableCell>
        <TableCell align="center">{formatDate(model.timeUpdate)}</TableCell>
        <TableCell align='center'>
          <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', right: 5, top: 12 }}
              icon={<i className='bx bxs-pencil _bxs-base'></i>}
              direction="left"
            >
              {
                actions.map((action, index) => (
                    <SpeedDialAction
                      key={index}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={(e)=>{
                        switch (action.link.trim()) {
                          case "delete":{
                            swal({
                              title: "Chú ý",
                              text: "Bạn có chắc chắn muốn xóa không",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            })
                            .then((willDelete) => {
                              if (willDelete) {
                                swal("Đã xóa", {
                                  icon: "success",
                                });
                                // productModelService.delete(model.id)
                                // .then((response)=>{
                                //   swal("Đã xóa", {
                                //     icon: "success",
                                //   });
                                // })
                                // .catch(function (error) {
                                //   swal("Lỗi", "", "error");
                                //   console.log(error);
                                // })
                                
                              }
                            });
                            break;
                          }
                          case "status":{
                            setOpenDialog(true);
                            break;
                          }
                          case "info":{
                            navigate("/admin/model/"+model.id+"/info");
                            break;
                          }
                          case 'images':{
                            setOpenDialogImages(true);
                            break;
                          }
                        
                          default:
                           
                            break;
                        }
                        
                      }}
                    />
                ))
              }
            </SpeedDial>
          </Box>
        </TableCell>
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
          <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Hãy chọn trạng thái cần thay đổi"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Trạng thái</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel name='status' value={true} control={<Radio />} label="Bình thường" />
                    <FormControlLabel name='status' value={false} control={<Radio />} label="Ngừng sử dụng" />
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Quay lại</Button>
              <Button onClick={handleSubmitStatus} >Xác nhận</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDialogImages}
            onClose={handleCloseDialogImages}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <form id='formEditImage' onSubmit={handleChangeImages}>
              <DialogTitle id="alert-dialog-title">
                {"Chọn lại hình ảnh"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                        <input type="file" id='inputImages'  hidden name="images" multiple enctype="multipart/form-data"
                                onChange={(e)=>{
                                  let data = [];
                                  for (let i = 0; i <  e.target.files.length; i++) {
                                    const fileReader = new FileReader()
                                    fileReader.readAsDataURL(e.target.files[i])
                                    fileReader.onload = function() {
                                      const url = fileReader.result
                                      data.push(url)
                                    }
                                  }
                                  setImages(data)
                                  props.reload()
                                }} 
                          />
                        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                          {
                            images.map((item, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={item}
                                  alt='images'
                                  loading="lazy"
                                />
                              </ImageListItem>
                            ))
                          }
                        </ImageList>
                        <Button style={{width:'30%', margin:'10px 35%'}} variant="outlined" id="btnImages" onClick={(e)=>{
                          document.getElementById('inputImages').click()
                          setImages([])
                        }}
                          > Chọn hình ảnh </Button>
                    </RadioGroup>
                  </FormControl>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogImages}>Quay lại</Button>
                <Button type='submit' >Xác nhận</Button>
              </DialogActions>
            </form>
          </Dialog>
    </React.Fragment>
  )
}
