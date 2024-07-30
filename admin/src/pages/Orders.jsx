

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { FaBox } from "react-icons/fa6"
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrder = async () => {
    const res = await axios.get(`${url}/api/order/list`)
    if (res.data.success) {
      setOrders(res.data.data)
    } else {
      toast.error("An error has occurred")
    }
  }

  useEffect(() => {
    fetchAllOrder()
  }, [])
  return (
    <section className="p-4 sm:p-10 box-order w-full">
      <h4 className="bold-22 uppercase">Order Page</h4>
      <div className="overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left hidden sm:table-cell" >Package </th>
              <th className="p-1 text-left" >Order</th>
              <th className="p-1 text-left" >Items</th>
              <th className="p-1 text-left" >Price</th>
              <th className="p-1 text-left" >Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b-black border-slate-900/20 text-gray-50 p-6 medium-14 text-left">
                <td className="p-1 hidden sm:table-cell"><FaBox /></td>
                <td className="p-1">
                  <div className="pb-2">
                    <p>{order.items.map((item, i) => {
                      if (i === order.items.length - 1) {
                        return item.name + " x " + item.quantity
                      } else {
                        return item.name + " x " + item.quantity + ", "
                      }
                    })}
                    </p>
                  </div>
                  <hr className="w-1/2" />
                  <div className="">
                    <h5 className="medium-15">{order.address.firstName  + " " + order.address.lastName}</h5>
                    <div className="">
                      <p>{order.address.street  + ", "}</p>
                      <p>{order.address.city  + ", "+ order.address.zipcode + ", " + order.address.state + ", " + order.address.country}</p>
                    </div>
                    <p>{order.address.phone}</p>
                  </div>
                </td>
                <td className="p-1" >{order.items.length}</td>
                <td className="p-1" >${order.amount}</td>
                <td className="p-1">
                  <select className="bg-primary ring-1 ring-secondary text-sm max-w-20 xl:max-w-28">
                    <option value="Product Loading">Product Loading</option>
                    <option value="Out for delivery">out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Orders