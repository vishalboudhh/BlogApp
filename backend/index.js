import express from "express";
import dotenv from "dotenv";
import datbaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweet.route.js"
import { errorHandler } from "./middleware/errorHandler.js";
import cors from 'cors'
dotenv.config()

const app = express();
const port =  process.env.PORT || 3000
datbaseConnection();

// CORS configuration - MUST be before other middleware
const allowedOrigins = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ["http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
}
app.use(cors(corsOptions))

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser()); 
app.use(errorHandler); 
app.use("/uploads", express.static("uploads"));

//Api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet",tweetRoute)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
