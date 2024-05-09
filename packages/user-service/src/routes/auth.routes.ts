import express, { RouterOptions } from "express";
import {
  signUp,
  singIn,
  checkLogin,
  googleOAuth,
  googleOAuthCallback,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", singIn);
router.get("/google", googleOAuth);
router.get("/google/callback", googleOAuthCallback);
router.get("/check", checkLogin);

export default router;
