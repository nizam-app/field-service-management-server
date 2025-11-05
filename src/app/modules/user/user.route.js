import express from "express";


const router = express.Router();

router.post("/register", UserController.registerUser);

export const UserRoutes = router