import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"



const Order = () => {
  const { getTotalCartAmount, all_products, cartItems, url,token } = useContext(ShopContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    country: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }
  
  const placeOrder = async  (event) => {
      event.preventDefault()

      let orderItems = []
      all_products.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item
          itemInfo['quantity'] = cartItems[item._id]
          orderItems.push(itemInfo)
        }
      })
      let  orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount() + 2,
      }

      let res = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
      if (res.data.success) {
        const {session_url} = res.data
        window.location.replace(session_url)
      }else{
        toast.error("An error has occurred")
      }
  }


  return (
    <section className="max-padd-container py-28  xl:py-32">
      <form onSubmit={placeOrder} className="flex flex-col xl:flex-row gap-20 xl:gap-28">
        <div className="flex flex-1 flex-col gap-3 text-[95%]">
          <h3 className="bold-28 mb-4">Delivery Information</h3>
          <div className="flex gap-3">
            <input required type="text" placeholder="First name" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" onChange={onChangeHandler} value={data.firstName} name="firstName" />
            <input required type="text" placeholder="Last name" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" onChange={onChangeHandler} name="lastName" value={data.lastName} />
          </div>
          <input required type="email" placeholder="Email address" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" onChange={onChangeHandler} name="email" value={data.email} />
          <input required type="text" placeholder="Phone number" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" name="phone" onChange={onChangeHandler} value={data.phone} />
          <input required type="text" placeholder="Street" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" name='street' onChange={onChangeHandler} value={data.street} />
          <div className="flex gap-3">

            <input required type="text" placeholder="City" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" name="city" onChange={onChangeHandler} value={data.city} />
            <input required type="text" placeholder="State" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" name="state" onChange={onChangeHandler} value={data.state} />
          </div>
          <div className="flex gap-3">
            <input required type="text" placeholder="Zip code" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" name="zipcode" onChange={onChangeHandler} value={data.zipcode} />
            <input required type="text" placeholder="Country" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" name="country" onChange={onChangeHandler} value={data.country} />
          </div>

        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <h4 className="bold-22">Summary</h4>
            <div >
              <div className="flexBetween py-3">
                <h4 className="medium-16">SubTotal:</h4>
                <h4 className="text-gray-30 font-semibold" >${getTotalCartAmount()}</h4>
              </div>
              <hr />
              <div className="flexBetween py-3">
                <h4 className="medium-16">Shipping Fee:</h4>
                <h4 className="text-gray-30 font-semibold" >${getTotalCartAmount() === 0 ? 0 : 2}</h4>
              </div>
              <hr />
              <div className="flexBetween py-3">
                <h4 className="medium-18">Total:</h4>
                <h4 className="bold-18" >${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</h4>
              </div>
            </div>
            <button type="submit" className="btn-secondary w-52 rounded" >Proceed to Checkout</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Order