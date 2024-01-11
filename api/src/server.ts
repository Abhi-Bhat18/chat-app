import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// route importes
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from './routes/userRoutes.ts';
import messageRoutes from './routes/messageRoutes.ts';

import { jwtAuthGuard } from "./middlewares/authMiddleware.ts";
import connectToMongoDB from "./db/mongodb.ts";

dotenv.config();

const server = async () => {
  try {

    connectToMongoDB(process.env.MONGO_URI as string);

    const app: Application = express();

    // middlewares
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

    // Routes
    app.use("/api/v1/auth", authRoutes);
    app.use('/api/v1/user', jwtAuthGuard, userRoutes);
    app.use('/api/v1/message', jwtAuthGuard, messageRoutes);

    app.get('/', (req, res) => {
      res.json({ status: "ok" })
    })

    return app;
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

server()
  .then(app => app?.listen('1337', () => console.log('Server is up and running at 1337')))
  .catch(err => console.log(err))



