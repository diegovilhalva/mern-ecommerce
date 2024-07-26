import express from "express"
import { addProduct, listProducts, removeProduct } from "../controller/product.controller.js"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post('/add',upload.single('image'),addProduct)
router.get('/list',listProducts)
router.post('/remove',removeProduct)

export default router