import express from "express";
import userRouter from './routes/user.js'
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

export const app = express();

config({
  path: './data/config.env'
})
app.use(cors(corsOptions));

app.use(express.json())

var corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:4000",
    "https://v2.blockstarz.xyz",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cookieParser())

app.use(userRouter)
