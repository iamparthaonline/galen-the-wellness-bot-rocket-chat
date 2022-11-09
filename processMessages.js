const moment = require("moment");
const { defaultMessage } = require("./messages.json");
const sendMessage = require("./lib/sendMessage");
const handleTakeBreakRequest = require("./features/takeBreak");
const userModel = require("./schema/User");
const messageModel = require("./schema/Message");

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

    /**
     * Last message in input interval which needs to be continued
     */
    const lastMessageDetails = await messageModel
      .findOne({
        roomId,
        createdAt: {
          $gt: moment()
            .subtract(process.env.MESSAGE_TIMEOUT / 1000, "seconds")
            .toDate(),
        },
        messageType: { $nin: ["USER_MESSAGE", "WRONG_INPUT"] },
      })
      .sort([["createdAt", -1]]);
    /**
     * Store the current message details in DB
     */
    const receivedMessageToBeSaved = new messageModel(messageDataToBeSaved);
    await receivedMessageToBeSaved.save();

    console.log("lastMessageDetails =======", lastMessageDetails);
    const messageToBeProcessed = message.trim().toUpperCase();

    const defaultMessageToBeSent = defaultMessage[userData.language].replace(
      "__userName__",
      name
    );
    let isDefault = false;

    if (
      !lastMessageDetails ||
      lastMessageDetails.messageType === "END_OF_CONVERSATION" ||
      lastMessageDetails.messageType === "DEFAULT"
    ) {
      /** Main Menu Navigation */
      switch (messageToBeProcessed) {
        case "4️⃣":
        case "4":
        case 4: {
          await handleTakeBreakRequest(driver, roomId, userData);
          break;
        }
        default: {
          isDefault = true;
        }
      }
    } else if (
      lastMessageDetails.messageType === "TAKE_BREAK_MENU" ||
      lastMessageDetails.messageType === "TAKE_BREAK_REMINDER_STAT"
    ) {
      /**Take Break Menu Navigation */
      isDefault = await handleTakeBreakRequest(
        driver,
        roomId,
        userData,
        message.trim(),
        lastMessageDetails.messageType
      );
      console.log("isDefault", isDefault);
    }
    if (isDefault)
      await sendMessage(driver, defaultMessageToBeSent, roomId, true, userData);
  }
};

module.exports = processMessages;
