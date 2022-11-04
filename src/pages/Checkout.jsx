import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import cartSession from '../utils/cartSession'

const Checkout = () => {
    const  history = useLocation();
    const [cartProducts, setCartProducts] = useState(cartSession.getCart())
    const [address, setAddress] = useState(null)
    const [note, setNote] = useState(null)


    

    useEffect(() => {
        
    
        
    }, []);

    

  return (
    <div>
      
    </div>
  )
}

export default Checkout
