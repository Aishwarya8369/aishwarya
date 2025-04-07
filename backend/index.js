import express from "express";
import cors  from "cors";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";
import { connectDB } from "./config/db.js";


const app = express();
const port = 4004 || process.env.PORT;


app.use(express.json());
app.use(cors());

//api end points 

app.use("/api/user", userRouter);

connectDB();

app.get("/" , (req,res) => {
    res.send("API WORKING!!")
})

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
});


