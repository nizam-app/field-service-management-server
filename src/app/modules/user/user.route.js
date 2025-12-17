import express from "express";
import { UserControllers } from "./user.controller.js";

const router = express.Router();

router.post("/register-customer", UserControllers.registerCustomer);
router.post("/register-call-center-agent", UserControllers.registerCallCenterAgent);
router.post("/dispatcher", UserControllers.registerDispatcher);
router.post("/register-freelancer-technician", UserControllers.registerFreelancerTechnician);
router.post("/register-internal-technician", UserControllers.registerInternalTechnician);
router.post("/register-admin", UserControllers.registerAdmin);


export const UserRoutes = router