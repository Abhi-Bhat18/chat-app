import express, { Request, Application, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import chatRoutes from './routes/messageRoutes.ts';
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from './routes/userRoutes.ts';
import { jwtAuthGuard } from "./middlewares/authMiddleware.ts";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://chat-app-snowy-nine.vercel.app"
    ],
    credentials: true,
  })
);
// Connection to the database
const mongoUri = process.env.MONGO_URI as string;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use('/api/v1/user',userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/chat',jwtAuthGuard,chatRoutes);

app.listen(1337,() => console.log('Server listening at http://localhost:1337'));


