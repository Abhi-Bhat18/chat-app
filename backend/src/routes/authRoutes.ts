import express, { RouterOptions } from "express";
import {
  checkLogin,
  googleOAuth,
  googleOAuthCallback,
} from "../controllers/authController.ts";

const router = express.Router();

router.get("/google", googleOAuth);
router.get("/google/callback", googleOAuthCallback);
router.get('/checkLogin',checkLogin)


export default router;
