const handleNoInputFromUser = require("./handleNoInput");
/**
 *
 * @param {*} driver - SDK driver with bot context
 * @param {*} messageToBeSent - language specific message that needs to be sent
 * @param {*} roomId - room id where message will be delivered
 * @param {Boolean} isReplyRequired - should we wait for a user reply to this message
 * @param {Object} userData - data of the user
 */
const sendMessage = async (
  driver,
  messageToBeSent,
  roomId,
  isReplyRequired,
  userData
) => {
  /**
   * Send the message
   */
  const messageDetails = await driver.sendToRoomId(messageToBeSent, roomId);

  /**
   * Store the message details in DB
   */
  // console.log("messageDetails", messageDetails);

  /**
   * Set a scheduled item if there is a reply required from user
   */
  if (isReplyRequired) {
    handleNoInputFromUser(driver, roomId, messageDetails, userData);
  }
};

module.exports = sendMessage;
