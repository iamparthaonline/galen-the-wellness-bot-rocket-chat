// https://developer.rocket.chat/reference/api/rest-api/endpoints/core-endpoints/chat-endpoints/postmessage

const axios = require("axios");
const constructMessage = require("./constructMessage");

const { AUTH_TOKEN, AUTH_USER_ID, API_URL } = process.env;
const sendMessageAPI = async (
  roomId = "",
  message = "",
  messageOptions = {},
  userData = {},
  messageType = ""
) => {
  const messageToBeSent = constructMessage(
    message,
    messageOptions,
    userData.language
  );
  const data = JSON.stringify({ text: messageToBeSent, roomId: `#${roomId}` }); //messageBogy is JSON object
  const config = {
    method: "post",
    url: API_URL,
    headers: {
      "X-Auth-Token": AUTH_TOKEN,
      "X-User-Id": AUTH_USER_ID,
      "Content-type": "application/json",
    },
    data: data,
  };

  const response = await axios(config);

  console.log("response --- - -- ", response.data.message);

  // save the message in DB
  const {
    msg,
    ts: { $date: messageTime },
    u: { username },
    _id: messageId,
  } = response.data.message;

  const messageDataToBeSaved = {
    createdAt: new Date(),
    message: msg,
    roomId,
    messageTime,
    username,
    messageId,
    messageType,
  };

  console.log("messageDataToBeSaved --------- ", messageDataToBeSaved);
  const messageData = new messageModel(messageDataToBeSaved);
  await messageData.save();

  return response.data.message;
};

module.exports = sendMessageAPI;
