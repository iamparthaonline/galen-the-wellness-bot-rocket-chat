const mongoose = require("mongoose");
require("dotenv").config();
const { driver } = require("@rocket.chat/sdk");

const { HOST, BOT_USER, BOT_PASSWORD, BOTNAME, SSL } = process.env;
const processMessages = require("./processMessages.js");
const taskScheduler = require("./lib/scheduler");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Bot configuration
const runbot = async () => {
  await driver.connect({ host: HOST, useSsl: SSL });
  const botUserId = await driver.login({
    username: BOT_USER,
    password: BOT_PASSWORD,
  });

  await driver.subscribeToMessages();
  console.log("subscribed");

  driver.reactToMessages((err, message, messageOptions) => {
    console.log("message aya hai boss --- ", { err, message, messageOptions });
    if (message.u._id === botUserId) return;
    else {
      processMessages(driver, err, message, messageOptions);
    }
  });
  console.log("connected and waiting for messages");
};

runbot();
taskScheduler.start();
