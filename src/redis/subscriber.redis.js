import { subscriber } from "./pubsub.redis.js";

function startSubscriber() {
    subscriber.subscribe("subscription created");
    subscriber.on("message", (channel, message) => {
        console.log(`[Redis][${channel}] Received message: ${message}`);
    });
};

export default startSubscriber;
