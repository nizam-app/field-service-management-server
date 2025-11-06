import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { AuthValidator } from "./auth.validation.js";
import { AuthControllers } from "./auth.controller.js";

const router = Router();

// login
router.post("/login", validateRequest(AuthValidator.login), AuthControllers.loginUser);

export const AuthRoutes = router;