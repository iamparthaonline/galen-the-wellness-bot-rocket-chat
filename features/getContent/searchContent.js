const sendMessage = require("../../lib/sendMessage");
const getContent = require("./index");
const { searchForContent } = require("../../messages.json");

showSearchWithContentTitle = async (
  driver,
  roomId,
  userData,
  selectedInput,
  lastMessageType
) => {
  const { name, language, username } = userData;
  if (
    typeof selectedInput !== "undefined" &&
    ["0️⃣", 0, "0"].indexOf(selectedInput.trim()) > -1
  ) {
    return true;
  }
  if (selectedInput) {
    console.log(selectedInput, "GetUserInput");
    await getContent(driver, roomId, userData, selectedInput);
  } else {
    const searchContentMessage = searchForContent[language].replace(
      "__userName__",
      name
    );
    await sendMessage(
      driver,
      searchContentMessage,
      roomId,
      true,
      userData,
      "SEARCH_FOR_CONTENT"
    );
  }
};

module.exports = showSearchWithContentTitle;
