import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://ramanaraovk18:ewB1nfgR55VrEcTW@cluster0.rtx8wvx.mongodb.net/zidioecom').then(() => console.log("DB connected"));
} 

    


//ewB1nfgR55VrEcTW