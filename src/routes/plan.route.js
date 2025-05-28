import { Router } from "express";
import { getPlans } from "../controllers/plan.controller.js";

const router = Router();

router.route("/").get(getPlans);

export default router;