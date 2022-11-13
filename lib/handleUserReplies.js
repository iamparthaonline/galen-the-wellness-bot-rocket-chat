const sendMessage = require("./sendMessage");
const rootNavigation = require("./rootNavigation");
const processMessageAndUserData = require("./processMessageAndUserData");
const getLastMessageDetails = require("./getLastMessageDetails");
const constructMessage = require("./constructMessage");
const handleTakeBreakRequest = require("../features/takeBreak");
const showSearchWithContentTitle = require("../features/getContent/searchContent");

const handleUserReplies = async (driver, err, messageData) => {
  if (!err) {
    const { userData, roomId, messageToBeProcessed, name } =
      await processMessageAndUserData(messageData);

    const lastMessageDetails = await getLastMessageDetails(roomId);

    const defaultMessageToBeSent = constructMessage("defaultMessage", {
      userName: name,
      language: userData.language,
    });

    let isDefault = !lastMessageDetails;

    if (!isDefault) {
      switch (lastMessageDetails.messageType) {
        /** Root Menu Navigation */
        case "END_OF_CONVERSATION": {
          isDefault = true;
          break;
        }
        case "DEFAULT": {
          isDefault = await rootNavigation(
            driver,
            messageToBeProcessed,
            roomId,
            userData
          );
          break;
        }
        /**Take Break Menu Navigation */
        case "TAKE_BREAK_MENU":
        case "TAKE_BREAK_REMINDER_STAT": {
          isDefault = await handleTakeBreakRequest(
            driver,
            roomId,
            userData,
            messageToBeProcessed,
            lastMessageDetails.messageType
          );
          break;
        }
        case "SEARCH_FOR_CONTENT": {
          isDefault = await showSearchWithContentTitle(
            driver,
            roomId,
            userData,
            messageToBeProcessed,
            lastMessageDetails.messageType
          );
          break;
        }
      }
    }

    if (isDefault)
      await sendMessage(driver, defaultMessageToBeSent, roomId, true, userData);
  }
};

module.exports = handleUserReplies;
