import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            }); 
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "user already exist",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User Signup successfully",
            success: true
        })

    } catch (error) {
        console.log(`Error in signup controller`, error);
        return res.status(500).josn({
            message: "Internal server error",
            success: false
        })
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success:false
            })
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User does not exist with this email.",
                success: false
            })
        };

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorect password",
                success: false
            });
        }



        const token = await jwt.sign({ userId: user._id }, process.env.TOKENSECRET, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        });

    } catch (error) {
        next(error)
    }
};

export const logout = async (req,res,next) =>{
    try {
        return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
            message:"User logged out successfully."
        })
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.user; // From auth middleware
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        next(error);
    }
};