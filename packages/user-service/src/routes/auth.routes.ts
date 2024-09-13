import express from "express";
import {
  signUp,
  singIn,
  checkLogin,
  googleOAuth,
  googleOAuthCallback,
} from "../controllers/auth.controller";
import requestBodyValidation from "../middlewares/bodyValidation";
import { signInValidation, signUpValidation } from "../helpers/validation.helper";
import { jwtAuthGuard } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/sign-up", requestBodyValidation(signUpValidation), signUp);
router.post("/sign-in", requestBodyValidation(signInValidation), singIn);
router.get("/google", googleOAuth);
router.get("/google/callback", googleOAuthCallback);
router.get("/check", jwtAuthGuard , checkLogin);

export default router;
