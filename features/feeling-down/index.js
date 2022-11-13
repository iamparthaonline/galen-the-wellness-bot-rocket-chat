/**
 * Take a break reminder
    - If a user has been online for more than 3 hours then nudge the user to take a break
    - Depending on the time of the day we can suggest the user do something else 
      ( walking, star gazing, doing small talk, etc ) - 
 */
const sendMessage = require("../../lib/sendMessage");
const {
  defaultFeelingLowMessage,
} = require("./messages.json");
const reminderModel = require("../../schema/Reminder");

handleFeelingLowRequest = async (
  driver,
  roomId,
  userData,
  selectedInput,
  lastMessageType
) => {
  const { name, language, username } = userData;

  /** If user has selected Back to Main Menu option */
  if (
    typeof selectedInput !== "undefined" &&
    ["0️⃣", 0, "0"].indexOf(selectedInput.trim()) > -1
  ) {
    return true;
  }

  if (selectedInput) {
    switch (selectedInput) {
      case "1️⃣":
      case "1":
      case 1: {
        await sendMessage(
          driver,
          "Quote",
          roomId,
          true,
          userData,
          "FEELING_LOW_QUOTE"
        );
        break;
      }
      case "2️⃣":
      case "2":
      case 2: {
        await sendMessage(
          driver,
          "GIF",
          roomId,
          true,
          userData,
          "FEELING_LOW_GIF"
        );
        break;
      }
      case "3️⃣":
      case "3":
      case 3: {
        await sendMessage(
          driver,
          "PIC",
          roomId,
          true,
          userData,
          "FEELING_LOW_PICTURE"
        );
        break;
      }

      case "4️⃣":
        case "4":
        case 4: {
          await sendMessage(
            driver,
            "Joke",
            roomId,
            true,
            userData,
            "FEELING_LOW_JOKE"
          );
          break;
        }
    }
  }

  else{
    const FeelingLowMessage = defaultFeelingLowMessage[
      language
    ].replace("__userName__", name);
    await sendMessage(
      driver,
      FeelingLowMessage,
      roomId,
      true,
      userData,
      "FEELING_LOW_MENU"
    );
  }




};

module.exports = handleFeelingLowRequest;
