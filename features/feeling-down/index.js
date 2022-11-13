/**
 * Take a break reminder
    - If a user has been online for more than 3 hours then nudge the user to take a break
    - Depending on the time of the day we can suggest the user do something else 
      ( walking, star gazing, doing small talk, etc ) - 
 */
const sendMessage = require("../../lib/sendMessage");
const getAQuote = require("./quotes")
const getAJoke = require("./jokes")
const getAGif = require("./gif")
const {
  defaultFeelingLowMessage,
  feelingLowSubMenuOptions
} = require("../../messages.json");
const reminderModel = require("../../schema/Reminder");

const FEELING_LOW_STATES = {"FEELING_LOW_QUOTE":["1️⃣",1,"1"],"FEELING_LOW_JOKE":["2️⃣",2,"2"],"FEELING_LOW_GIF":["3️⃣",3,"3"]}

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
  if(Object.keys(FEELING_LOW_STATES).includes(lastMessageType) ){
    if(selectedInput == 1){
      selectedInput  = FEELING_LOW_STATES[lastMessageType][0]
    }
    if(selectedInput == 2){
      selectedInput  = undefined
    }
  }
  if (selectedInput) {
    switch (selectedInput) {
      case "1️⃣":
        case "1":
          case 1: {
        await sendMessage(
          driver,
          getAQuote(language,name),
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
          getAJoke(language,name),
          roomId,
          true,
          userData,
          "FEELING_LOW_JOKE"
        );
        break;
      }
      case "3️⃣":
      case "3":
      case 3: {
        // const message = await getAGif()
        await sendMessage(
          driver,
          await getAGif(language,name),
          roomId,
          true,
          userData,
          "FEELING_LOW_GIF"
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
