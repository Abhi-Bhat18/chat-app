import express, { Request, Application, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoose, { mongo } from "mongoose";

import chatRoutes from './routes/messageRoutes.ts';
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from './routes/userRoutes.ts';
import { jwtAuthGuard } from "./middlewares/authMiddleware.ts";

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;

const server = async () => {
  try {
    const app: Application = express();

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
    app.use(express.json());
    app.use(cookieParser());

    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:5173",
          "https://chat-app-snowy-nine.vercel.app"
        ],
        credentials: true,
      })
    );

    app.use('/api/v1/user', userRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use('/api/v1/chat', jwtAuthGuard, chatRoutes);
    return app;
  } catch (error) {
    console.log(error)
  }
}

server()
  .then(app => app?.listen('1337', () => console.log('Server is up and running')))
  .catch(err => console.log(err))



