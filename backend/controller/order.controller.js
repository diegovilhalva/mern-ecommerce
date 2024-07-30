import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import  { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const frontend_url = 'http://localhost:5173'
export const placeOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save()
        
        
        await User.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 5.60,
            },
            quantity: item.quantity,
        }))

        line_items.push({
            price_data: {
                currency: "brl",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 5.68,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(200).json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "An error has occurred" })
    }
}


export const verifyOrder = async  (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success == "true") {
            await Order.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false,message:"Error"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error"})
    }   
}

export const userOrders = async (req,res) => {
    try {
        const orders  = await Order.find({userId:req.body.userId})

        res.status(200).json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error"})        
    }
}


export const listOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error"})    
    }
}