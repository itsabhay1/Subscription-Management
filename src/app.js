import express from "express";
import dotenv from "dotenv";
import planRoutes from "./routes/plan.route.js";
import authRoutes from "./routes/auth.route.js";
import subscriptionRoutes from "./routes/subscription.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.send("Server is live");
});

app.use("/api/v1/plans", planRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/subscription", subscriptionRoutes);
app.use(errorHandler);

export { app };