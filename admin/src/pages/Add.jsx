import React from 'react'
import upload_area from "../assets/upload_area1.svg"
import { FaPlus } from "react-icons/fa6"
const Add = ({ url }) => {
    return (
        <section className='p-4 sm:p-10 w-full bg-primary/20'>
            <form className='flex flex-col gap-y-5 max-w-[555px]'>
                <h4 className='bold-22 pb-2 uppercase'>Products Upload</h4>
                <div className='flex flex-col gap-y-2 max-w-24 h-24'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={upload_area} alt="" className='h-20' />
                    </label>
                    <input type="file" hidden required id='image' />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Product name</p>
                    <input type="text" name='name' className='ring-1 ring-slate-900/10 py-1 px-3 outline-none' placeholder='Type here...' required />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Product Description</p>
                    <textarea name="description" id="" rows={"6"} placeholder='Write content here..' required className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none'></textarea>
                </div>
                <div className='flex items-center gap-x-5 text-gray-900/70 medium-15'>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product category</p>
                        <select name="category" className='outline-none ring-1 ring-slate-900/10 pl-2'>
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product price</p>
                        <input type="number" name="price" placeholder='$20' className='ring-1 ring-alte-900/10 pl-2 w-24 outline-none' min={0} />
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