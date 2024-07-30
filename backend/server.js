import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.route.js"
import userRoutes from "./routes/user.route.js"
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js"
dotenv.config()
const app = express()
const port  = 4000

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/user',userRoutes)
app.use('/images',express.static('uploads'))

app.get('/',(req,res) => {
    res.send('ok')
})

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})
