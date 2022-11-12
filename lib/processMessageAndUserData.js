const userModel = require("../schema/User");
const messageModel = require("../schema/Message");

const processMessageAndUserData = async (messageData) => {
  const {
    msg: message,
    u: { username, name, _id: userId },
    rid: roomId,
    ts: { $date: messageTime },
    _id: messageId,
  } = messageData;

  const messageDataToBeSaved = {
    createdAt: new Date(),
    message,
    roomId,
    messageTime,
    username,
    messageId,
    messageType: "USER_MESSAGE",
  };

  /**
   * Store the current message details in DB
   */
  const receivedMessageToBeSaved = new messageModel(messageDataToBeSaved);
  await receivedMessageToBeSaved.save();

  /**
   * We need to get user had changed language or not from DB - user settings
   */
  let userData = {
    language: "en",
    username,
    name,
    userId,
    createdAt: new Date(),
  };

  const userDetails = await userModel.findOne({ username });

  if (!userDetails) {
    const userDataToBeSaved = new userModel(userData);
    await userDataToBeSaved.save();
  } else {
    userData = userDetails;
  }
  return {
    userData,
    roomId,
    messageToBeProcessed: message.trim().toUpperCase(),
    name,
  };
};

module.exports = processMessageAndUserData;
