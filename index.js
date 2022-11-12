const mongoose = require("mongoose");
const { driver } = require("@rocket.chat/sdk");
const colors = require("colors");

require("dotenv").config();

const handleUserReplies = require("./lib/handleUserReplies.js");
const taskScheduler = require("./lib/scheduler");

const { HOST, BOT_USER, BOT_PASSWORD, BOTNAME, SSL } = process.env;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully".bold.bgYellow.black);
});

// Bot configuration
const runbot = async () => {
  await driver.connect({ host: HOST, useSsl: SSL });
  const botUserId = await driver.login({
    username: BOT_USER,
    password: BOT_PASSWORD,
  });

  await driver.subscribeToMessages();
  console.log("Subscribed to rocket.chat".bold.bgYellow.black);

  driver.reactToMessages((err, message, { roomType }) => {
    if (message.u._id === botUserId || roomType === "c") return;
    else {
      handleUserReplies(driver, err, message, messageOptions);
    }
  });
  console.log(
    "Connected to Rocket.Chat and Waiting for messages".bold.bgYellow.black
  );
};

runbot();
taskScheduler.start();
