import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const publisher = new Redis(process.env.REDIS_URL, {
  password: process.env.REDIS_TOKEN,
  tls: {},
});

const subscriber = new Redis(process.env.REDIS_URL, {
  password: process.env.REDIS_TOKEN,
  tls: {},
});


publisher.on("error", (err) => {
  console.error("Redis Publisher Error:", err);
});

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err);
});

// Connection check
async function checkConnection() {
  try {
    await publisher.ping();
    console.log("Publisher connected to Redis!");
  } catch (err) {
    console.error("Publisher failed to connect:", err);
  }

  try {
    await subscriber.ping();
    console.log("Subscriber connected to Redis!");
  } catch (err) {
    console.error("Subscriber failed to connect:", err);
  }
}

checkConnection();

export { publisher, subscriber };
