import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import Rating from '@mui/material/Rating';

import Button from './Button';

import formatDate from '../utils/formatDate';
import ratingService from '../service/ratingService';
// import { useNavigate } from 'react-router-dom';


const FormReview = (props) => {
    const [start, setStart] = useState(0);
    const [content,       setContent] = useState("");
    // const navigate = useNavigate();

    const  handleChangeContent = (e) => {
        setContent(e.target.value);
    };
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
        ratingService.Insert(content, start, props.productModelId)
        .then(function (response) {
                console.log(response.data.result);
                swal("Thành công", "Đánh giá của bạn đã được xác nhận", "success");
                props.loadAfterRating();
                setStart(0);
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                swal("Lỗi", error.response.data.message, "error");
            }else{
                swal("Lỗi", "", "error");
            }
           
        })
    };

    return (
        <div className="form-review">
            <div className="form-review__title">
                <ul className="">
                    <li key={"ti1"}><a href="#reviews" className="active show"><span>Reviews ({props.listRating.length})</span></a></li>
                </ul>
            </div>
            <div className="form-review__display active" id="tab-description">
                {
                    props.listRating.map((item, index) => (
                        <DisplayRating rating={item} key={index} />
                    ))
                }
                <h2>Viết đánh giá</h2>
                <form className="form-review__display__form" onSubmit={handleSubmit}>
                    <div>
                        <label className='label-start'>Đánh giá của bạn: </label>
                        <Rating className='form-review__display__form__start'
                            name="simple-controlled"
                            value={start}
                            onChange={(event, newValue) => {
                                setStart(newValue);
                            }}
                        />
                    </div>
                    <div className="form-review__display__form__message">
                        <div className="col-sm-12 p-0">
                            <label className="control-label">Hãy ghi lại những trải nghiệm chủa bạn</label><br/>
                            <textarea 
                                onChange={handleChangeContent} 
                                value={content} 
                                className="review-textarea" 
                                name="message" 
                                rows="10" ></textarea>
                            <p>Chú ý: bạn phải mua hàng rồi mới được đánh giá sản phẩm!</p>
                        </div>
                    </div>
                    <div className="form-review__display__form__rating">
                        <Button size="sm" >
                            Gửi
                        </Button>
                        
                    </div>
                </form> 
            </div>
            
        </div>
  )
}


const DisplayRating = (props) =>{
    return (
            <div className="form-review__display__review" key={props.key}>
                <table className="form-review__display__review__table">
                    <tbody>
                        <tr className="form-review__display__review__table__title">
                            <td  className="form-review__display__review__table__title__name">
                                <strong>{props.rating.user.firstName + " " + props.rating.user.lastName}</strong>
                            </td>
                            <td  className="form-review__display__review__table__title__date">
                                {formatDate(props.rating.timeCreate)}
                            </td>
                        </tr>
                        <tr className="form-review__display__review__table__content"> 
                            <td colSpan="2">
                                <p>{props.rating.content}</p>
                                <div className="form-review__display__review__table__content__rating">
                                    <Rating
                                        name="Read only"
                                        value={props.rating.rating}
                                        readOnly
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    )
}


export default FormReview
