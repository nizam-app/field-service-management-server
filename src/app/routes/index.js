import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;