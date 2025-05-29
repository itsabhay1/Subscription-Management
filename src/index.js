import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import startSubscriber from "./redis/subscriber.redis.js";
import checkAndExpireSubscriptions from "./utils/subscriptionExpiry.js";

dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    })

    startSubscriber();
    checkAndExpireSubscriptions();
})
.catch((err) => {
    console.log("MONGODB CONNECTION FAILED !!",err);
})