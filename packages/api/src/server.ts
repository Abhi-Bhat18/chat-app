import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/mongodb";
import appRouter from "./routes";

dotenv.config();

const server = async () => {
  try {
    await connectToMongoDB(process.env.MONGO_URI as string);

    const app: Application = express();

    // middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:5173",
          "https://chat-app-snowy-nine.vercel.app",
        ],
        credentials: true,
      })
    );

    // Routes
    app.use(appRouter);

    app.get("/", (req, res) => {
      res.json({ status: "ok" });
    });

    return app;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

server()
  .then((app) =>
    app?.listen("1337", () => console.log("Server is up and running at 1337"))
  )
  .catch((err) => console.log(err));
