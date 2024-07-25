import Product from "../models/product.model.js";
import fs from "fs"
export const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })


    try {
        await product.save()
        res.status(201).json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: "An error has occured" })
    }

}

export const listProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: "An error has occurred" })
    }
}

export const removeProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.body.id)
        fs.unlink(`uploads/${product.image}`,() => {})

        await Product.findByIdAndDelete(req.body.id)

        res.status(200).json({success:true,message:"Product deleted successfully!"})

    } catch (error) {
        console.log(error)
        res.status(500).json({succes:false,message:"An error has occurred"})
    }
}