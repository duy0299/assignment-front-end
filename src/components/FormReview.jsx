import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Rating from '@mui/material/Rating';
import Button from './Button';

const FormReview = (props) => {
    const [value, setValue] = useState(0);
  return (
    <div className="form-review">
        <div className="form-review__title">
            <ul className="">
                <li><a href="#reviews" className="active show"><span>Mô tả chi tiết</span></a></li>
                <li><a href="#reviews" className="active show"><span>Reviews ()</span></a></li>
            </ul>
        </div>
        {/* <div className="form-review__display" id="tab-review">
            <p></p>
        </div> */}
        <div className="form-review__display active" id="tab-description">
            <div className="form-review__display__review">
                <table className="form-review__display__review__table">
                    <tbody>
                        <tr className="form-review__display__review__table__title">
                            <td  className="form-review__display__review__table__title__name">
                                <strong>Nguyễn bảo duy</strong>
                            </td>
                            <td  className="form-review__display__review__table__title__date">
                                25/04/2019
                            </td>
                        </tr>
                        <tr className="form-review__display__review__table__content"> 
                            <td colspan="2">
                                <p>Good product! Thank you very much</p>
                                <div className="form-review__display__review__table__content__rating">
                                    <Rating
                                        name="Read only"
                                        value={value}
                                        readOnly
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>Write a review</h2>
            <form className="form-review__display__form">
                <div className="form-review__display__form__message">
                    <div className="col-sm-12 p-0">
                        <label className="control-label">Hãy ghi lại những trải nghiệm chủa bạn</label><br/>
                        <textarea className="review-textarea" name="message" rows="10" ></textarea>
                        <p>Chú ý: bạn phải mua hàng rồi mới được đánh giá sản phẩm!</p>
                    </div>
                </div>
                <div className="form-review__display__form__rating">
                    <div>
                        <label>Đánh giá của bạn: </label>
                        <Rating className='form-review__display__form__rating__start'
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        />
                    </div>
                    <Button size="sm" >
                        Gửi
                    </Button>
                    
                </div>
            </form> 
        </div>
        
    </div>
  )
}
FormReview.propTypes = {
    
}

export default FormReview
