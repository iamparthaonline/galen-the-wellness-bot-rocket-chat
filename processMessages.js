const { default_message } = require("./messages.json");
// Process messages
const processMessages = async (driver, err, messageData, messageOptions) => {
  if (!err) {
    const messageObject = {
      messageData,
      messageOptions,
    };
    console.log("got message ", messageObject);

    /**
     * We need to store the message object in db here to track - todo
     */

    const {
      msg: message,
      u: { username, name },
      rid: roomId,
    } = messageData;

    /**
     * We need to get user had changed language or not from DB - user settings
     */
    const language = "en";
    let replyMessage;

    switch (message.toUpperCase()) {
      case 1: {
      }
      default: {
        replyMessage = default_message[language].replace("__userName__", name);
      }
    }

    if (replyMessage) await driver.sendToRoomId(replyMessage, roomId);
  }
};

module.exports = processMessages;
