require("dotenv").config();
const { driver } = require("@rocket.chat/sdk");

const { HOST, BOT_USER, BOT_PASSWORD, BOTNAME, SSL, ROOMS = [] } = process.env;

var myUserId;

// Bot configuration
const runbot = async () => {
  const conn = await driver.connect({ host: HOST, useSsl: SSL });
  myUserId = await driver.login({ username: BOT_USER, password: BOT_PASSWORD });
  const roomsJoined = await driver.joinRooms(ROOMS);
  console.log("joined rooms");

  const subscribed = await driver.subscribeToMessages();
  console.log("subscribed");

  const msgloop = await driver.reactToMessages(processMessages);
  console.log("connected and waiting for messages");

  const sent = await driver.sendToRoom(BOTNAME + " is listening ...", ROOMS[0]);
  console.log("Greeting message sent");
};

// Process messages
const processMessages = async (err, message, messageOptions) => {
  if (!err) {
    if (message.u._id === myUserId) return;
    const roomname = await driver.getRoomName(message.rid);

    console.log("got message " + message.msg + " " + message.u._id);

    await driver.sendToRoomId("default message", message.rid);
  }
};

runbot();
