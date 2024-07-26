
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import "dotenv/config"
export const loginUser = async (req, res) => {
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({success:false,message:"User or password incorrect"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch) {
            return res.status(400).json({success:false,message:"User or password incorrect"})
        }
        const token = createToken(user._id)
        
        res.status(200).json({success:true,token})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"An error has occurred"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


export const registerUser = async (req, res) => {
    const { name, password, email } = req.body

    try {
        const exists = await User.findOne({ email: email })
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.status(401).json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.status(401).json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)


        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.status(201).json({sucess:true,token,message:"User registered successfully"})


    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"An error has occurred"})
    }
}

