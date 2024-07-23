import { createContext, useEffect, useState } from 'react'
import { all_products } from '../assets/data'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  useEffect(() => {
    console.log(cartItems)
  },[cartItems])
  const contextvalue = { all_products, cartItems, setCartItems, addToCart, removeFromCart }

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider