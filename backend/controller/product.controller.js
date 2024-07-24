import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const product = new Product({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    

    try {
        await product.save()
        res.status(201).json({success:true,message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"An error has occured"})
    }

}