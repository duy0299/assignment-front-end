import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCallback } from 'react';
import { useRef } from 'react';
import {  useNavigate } from 'react-router-dom';

const Dropdown = (props) => {
  const itemRef = useRef(null);
  const navigate = useNavigate()
  const handleDropdown = useCallback((e)=>{
    console.log(e);
    itemRef.current.classList.toggle('_displayNone')
  },[])

//   const handleOnClickParent = useCallback((e)=>{
//       navigate("/catalog/category/")
//   })

//   const handleOnClick = useCallback((e)=>{
//     navigate("/catalog/category/")
// })


  
  if(props.parent == null || props.parent == undefined){
    <li  className='sub-menu'>
    </li>
  }else{
    return (
          
          (props.parent.listChildren.length==0)
          ?
          <li>
            <a href='javascript:void(0)'  onClick={(e)=>{
                    navigate(`/catalog/category/${props.parent.id}/1`)
                  }}>
                    {props.parent.name}
            </a>
          </li>
          :
          <li  className='sub-menu'>
            <a href='javascript:void(0)'> <span onClick={(e)=>{
                    navigate(`/catalog/category/${props.parent.id}/1`)
                    }}>{props.parent.name}</span>
               <i className='bx bx-chevron-down' onClick={handleDropdown}></i>
            </a>
            
            <ul ref={itemRef} className='_children_ _displayNone'>
              {
                props.parent.listChildren.map((item, index)=>(
                  <li><a href='javascript:void(0)' onClick={(e)=>{
                    navigate(`/catalog/category/${item.id}/1`)
                    }}
                  >{item.name}</a></li>
                ))
              }
            </ul>
          </li>
    )
  }
  

}
Dropdown.propTypes = {
    parent: PropTypes.object,
    children: PropTypes.array
}

export default Dropdown


const ItemDrowdown = ()=>{
  
  
}

