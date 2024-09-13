import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import { jwtAuthGuard } from "./middlewares/authMiddleware";
// import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";

const appRouter = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/user", jwtAuthGuard, userRoutes);
// appRouter.use("/api/v1/conversation", jwtAuthGuard, messageRoutes);


export default appRouter