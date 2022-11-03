import React from 'react'
import PropTypes from 'prop-types'

const PageCounter = (props) => {

  return (
    <div className='_pageCounter'>
        
        <div className='_pageCounter__page'>

        </div>
    </div>
  )
}
PageCounter.propTypes = {
    currentPage: PropTypes.number,
    totalPage: PropTypes.number
}

export default PageCounter
