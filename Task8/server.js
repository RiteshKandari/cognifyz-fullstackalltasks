const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const client = require("./redis"); // Redis Client
require("./jobs"); // Background Jobs

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

// 🚀 API Route with Redis Caching
app.get("/data", async (req, res) => {
  const cachedData = await client.get("cachedResponse");

  if (cachedData) {
    console.log("✅ Serving from Cache");
    return res.json({ source: "cache", data: JSON.parse(cachedData) });
  }

  console.log("🔄 Fetching fresh data...");
  const freshData = { message: "Hello from Server!", time: new Date() };
  await client.setEx("cachedResponse", 30, JSON.stringify(freshData)); // Cache for 30 sec

  res.json({ source: "server", data: freshData });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
