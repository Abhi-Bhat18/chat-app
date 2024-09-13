import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/mongodb";
import appRouter from "./routes";
import logger from "./utils/logger";

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
      logger.info('This is the test log')
      res.json({ status: "ok", service: "user-service" });
    });

    return app;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const port = process.env.PORT || 1335;

server()
  .then((app) =>
    app?.listen(port, () => console.log(`Server is up and running at ${port}`))
  )
  .catch((err) => console.log(err));
