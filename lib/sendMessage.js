const { noInputMessage } = require("../messages.json");
const messageModel = require("../schema/Message");
/**
 *
 * @param {*} driver - SDK driver with bot context
 * @param {String} messageToBeSent - language specific message that needs to be sent
 * @param {String} roomId - room id where message will be delivered
 * @param {Boolean} isReplyRequired - should we wait for a user reply to this message
 * @param {Object} userData - data of the user
 * @param {String} messageType - type of the message
 *
 */
const sendMessage = async (
  driver,
  messageToBeSent,
  roomId,
  isReplyRequired,
  userData,
  messageType = "DEFAULT"
) => {
  /**
   * Send the message
   */
  const messageDetails = await driver.sendToRoomId(messageToBeSent, roomId);
  const {
    msg: message,
    ts: { $date: messageTime },
    u: { username },
    _id: messageId,
  } = messageDetails;
  /**
   * Store the message details in DB
   */
  const messageDataToBeSaved = {
    createdAt: new Date(),
    message,
    roomId,
    messageTime,
    username,
    messageId,
    messageType,
  };
  console.log("messageType --------- ", messageType);
  const messageData = new messageModel(messageDataToBeSaved);
  await messageData.save();

  /**
   * Set a scheduled item if there is a reply required from user
   */
  if (isReplyRequired) {
    const oldMessageId = messageId;
    setTimeout(async () => {
      // Check whether there has been an input after targetMessageId if not then send message
      const lastMessage = await messageModel
        .findOne({})
        .sort([["createdAt", -1]]);

      // If there has not been any update from user side after the last message then show sorry message
      if (oldMessageId === lastMessage.messageId) {
        const messageDetailsForNoInput = await driver.sendToRoomId(
          noInputMessage[userData.language],
          roomId
        );

        const {
          msg: message,
          ts: { $date: messageTime },
          u: { username },
          _id: messageId,
        } = messageDetailsForNoInput;

        const noReplyMessageDataToBeSaved = {
          createdAt: new Date(),
          message,
          roomId,
          messageTime,
          username,
          messageId,
          messageType: "END_OF_CONVERSATION",
        };

        // * Store the message details in DB
        const messageData = new messageModel(noReplyMessageDataToBeSaved);
        await messageData.save();
      }
    }, process.env.MESSAGE_TIMEOUT);
  }
};

module.exports = sendMessage;
