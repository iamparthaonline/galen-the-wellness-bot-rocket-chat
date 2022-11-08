const { defaultMessage } = require("./messages.json");
const sendMessage = require("./lib/sendMessage");
const handleTakeBreakRequest = require("./features/takeBreak");

/**
 *
 * @param {Object} driver - SDK driver with bot context
 * @param {Object} err - any errors that might have happened in message retrieval
 * @param {Object} messageData - has all the data about the message received
 * @param {Object} messageOptions - tells about the roomParticipant and roomType
 */
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
    const userData = {
      language: "en",
    };

    const messageToBeProcessed = message.trim().toUpperCase();

    switch (messageToBeProcessed) {
      case "5️⃣":
      case "5":
      case 5: {
        await handleTakeBreakRequest(driver, roomId, userData);
        break;
      }
      default: {
        const replyMessage = defaultMessage[userData.language].replace(
          "__userName__",
          name
        );
        await sendMessage(driver, replyMessage, roomId, true, userData);
      }
    }
  }
};

module.exports = processMessages;
