import axios from 'axios'
import { createContext, useEffect, useState } from 'react'


export const ShopContext = createContext(null)

const ShopContextProvider =  (props) => {
  const [cartItems, setCartItems] = useState({})
  const url = "http://localhost:4000"
  const [token, setToken] = useState("")
  const [all_products,setAll_products] = useState([])
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})

    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
    }
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

  const loadCartData = async (token) => {
    const res = await axios.get(`${url}/api/cart/get`,{headers:{token}})
    setCartItems(res.data.cartData)
  }

  const fetchProductList = async() => {
    const res = await axios.get(`${url}/api/product/list`)
    setAll_products(res.data.data)
  }

  useEffect(() => {
   
    async function loadData(){
      await fetchProductList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  },[])
  const contextvalue = { all_products, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, url, token, setToken }

  return (
    <ShopContext.Provider value={contextvalue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider