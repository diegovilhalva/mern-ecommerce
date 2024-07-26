import React, { useEffect, useState } from 'react'
import upload_area from "../assets/upload_area1.svg"
import { FaPlus } from "react-icons/fa6"
import { toast } from 'react-toastify';

import axios from "axios"

const Add = ({url}) => {
   
    const [image,setImage] = useState(false)
    const [data,setData] = useState({
        name:'',
        description:'',
        price:'',
        category:'Women'
    })

    const onChangeHandler = (e) => {
        const name = e.target.name 
        const value = e.target.value
        setData((data) => ({...data,[name]:value}))
    }

   
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)
       
        const res = await axios.post(`${url}/api/product/add`,formData)
        if (res.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                category:"Women"
            })
            setImage(null)
            toast.success(res.data.message)
          
        }else{
            toast.error(res.data.error)
        }
        
    }

    
    return (
        <section className='p-4 sm:p-10 w-full bg-primary/20'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-5 max-w-[555px]'>
                <h4 className='bold-22 pb-2 uppercase'>Products Upload</h4>
                <div className='flex flex-col gap-y-2 max-w-24 h-24'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image)  : upload_area} alt="" className='h-20 object-cover' />
                    </label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} hidden required id='image' />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Product name</p>
                    <input type="text" name='name' className='ring-1 ring-slate-900/10 py-1 px-3 outline-none' placeholder='Type here...' onChange={onChangeHandler} value={data.name} required />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} name="description" id="" rows={"6"} placeholder='Write content here..' required className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none' value={data.description}></textarea>
                </div>
                <div className='flex items-center gap-x-5 text-gray-900/70 medium-15'>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product category</p>
                        <select 
                        onChange={onChangeHandler}
                        value={data.category}
                        name="category" className='outline-none ring-1 ring-slate-900/10 pl-2'>
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product price</p>
                        <input type="number" onChange={onChangeHandler} value={data.price} name="price" placeholder='$20' className='ring-1 ring-alte-900/10 pl-2 w-24 outline-none' min={0} />
                    </div>
                </div>
                <button type='submit' className='btn-dark sm:w-5/12  flexCenter gap-x-2 !py-2 rounded'>
                    <FaPlus/>
                    Add Product
                </button>
            </form>
        </section>
    )
}

export default Add