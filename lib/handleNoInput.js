const { noInputMessage } = require("../messages.json");
const sendMessage = require("./sendMessage");
const handleNoInputFromUser = async (
  driver,
  roomId,
  targetMessageId,
  userData
) => {
  console.log("sendMessage", sendMessage);
  setTimeout(async () => {
    // Check whether there has been an input after targetMessageId if not then send message
    await sendMessage(driver, noInputMessage[userData.language], roomId);
  }, 5000);
  //   await sendMessage(driver, noInputMessage[userData.language], roomId);
};
module.exports = handleNoInputFromUser;
