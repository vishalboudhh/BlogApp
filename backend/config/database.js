import mongoose from "mongoose"
const datbaseConnection = async() =>{
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log(`MongoDB connected successfully`);
        
    } catch (error) {
        console.log(`Database connection error`,error);
    }
}

export default datbaseConnection;