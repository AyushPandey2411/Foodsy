import mongoose from "mongoose"

export const connectDB=async()=>{
    await mongoose.connect(process.env.DB_id).then(()=>console.log("DB connected"));
}