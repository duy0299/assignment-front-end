import React, {useRef} from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {

    const inputRef = useRef(null)

    const onchange = () => {
        console.log(inputRef);
        if (props.onchange) {
            props.onchange(inputRef.current)
        }
    }

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={onchange} checked={props.checked}/>
            <span className="custom-checkbox__checkmark">
                <i className="bx bx-check"></i>
            </span>
            {props.label}
        </label>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default CheckBox
