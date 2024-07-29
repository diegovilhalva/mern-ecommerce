import express from "express"
import { addToCart, removeFromCart, getCart } from "../controller/cart.controller.js"
const router = express.Router()

router.post('/add',addToCart)
router.post('/remove',removeFromCart)
router.get('/get',getCart)

export default router