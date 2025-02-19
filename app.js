import express from 'express';
import dotenv from "dotenv";

import connectDB from "./db.js"
dotenv.config();
const app = express();
import cors from "cors";
import authRoute from "./Routes/authRoute.js"
import noteRoute from "./Routes/noteRoute.js"

connectDB();

app.use(express.json());
app.use(cors());   


app.use("/api/v1/auth", authRoute);
app.use("/api/v1/note", noteRoute);





export default app;

