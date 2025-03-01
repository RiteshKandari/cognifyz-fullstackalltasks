const cron = require("node-cron");
const client = require("./redis");

// Her 10 second me ek task run karega
cron.schedule("*/10 * * * * *", async () => {
  const time = new Date().toLocaleTimeString();
  await client.set("lastJobRun", time);
  console.log(`⏳ Background Task Executed at ${time}`);
});

module.exports = cron;
