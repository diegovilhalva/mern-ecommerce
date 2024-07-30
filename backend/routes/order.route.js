import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, userOrders, verifyOrder } from "../controller/order.controller.js"

const router = express.Router()

router.post('/place',authMiddleware,placeOrder)
router.post('/verify',verifyOrder)
router.get('/userorders',authMiddleware,userOrders)
router.get('/list',listOrders)

export default router
