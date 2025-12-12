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

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser()); 
app.use(errorHandler); 
app.use("/uploads", express.static("uploads"));
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

//Api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet",tweetRoute)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
