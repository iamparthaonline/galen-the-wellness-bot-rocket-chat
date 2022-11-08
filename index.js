require("dotenv").config();
const { driver } = require("@rocket.chat/sdk");

const { HOST, BOT_USER, BOT_PASSWORD, BOTNAME, SSL, ROOMS = [] } = process.env;
const processMessages = require("./processMessages.js");

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
