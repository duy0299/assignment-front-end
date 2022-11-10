import swal from "sweetalert";

const  swalErrorAPI = (error)=>{
    let flat = true;
    if(error.response){
        if(error.response.data){
            if(error.response.data.message){
                swal("Lỗi", error.response.data.message, "error");
                flat = false;
              }
        }
    } 
    if(flat){
        swal("Lỗi", error.message, "error");
    }
}

export default  swalErrorAPI