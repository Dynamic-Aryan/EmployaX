import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"EmployaX",
        });
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
};