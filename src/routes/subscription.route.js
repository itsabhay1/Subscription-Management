import { Router } from "express";
import { cancelSubscription, createSubscription, getSubscription, updateSubscription } from "../controllers/subscription.controller.js";
import auth from "../middlewares/auth.middleware.js";


const router = Router();
router.use(auth);

router.route("/").post(createSubscription);
router.route("/me").get(getSubscription);
router.route("/:id").put(updateSubscription);
router.route("/:id").delete(cancelSubscription);

export default router;