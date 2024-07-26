import { createContext, useEffect, useState } from 'react'
import { all_products } from '../assets/data'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})
  const url = "http://localhost:4000"
  const [token,setToken] = useState("")
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

  const getTotalCartAmount = () => {
    let totalAmount = 0

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        
        let itemInfo = all_products.find((product) => product._id === item)
        totalAmount += itemInfo.price * cartItems[item]
      }
    } 
    return totalAmount;
  }
  const contextvalue = { all_products, cartItems, setCartItems, addToCart, removeFromCart,getTotalCartAmount,url,token,setToken }

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider