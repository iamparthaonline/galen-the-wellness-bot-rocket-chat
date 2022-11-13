const handleMedicineRequest = require("../features/medicine");
const handleTakeBreakRequest = require("../features/takeBreak");
const handleFeelingLowRequest = require("../features/feeling-down")

const rootNavigation = async (
  driver,
  messageToBeProcessed,
  roomId,
  userData
) => {
  /** Main Menu Navigation */
  switch (messageToBeProcessed) {
    case "1️⃣":
    case "1":
    case 1: {
      // Mahima - water reminder flow
      break;
    }
    case "2️⃣":
    case "2":
    case 2: {
      // Charchit - Mood enhancer
      await handleFeelingLowRequest(driver,roomId,userData)
      break;
    }
    case "3️⃣":
    case "3":
    case 3: {
      // Vedant -
      break;
    }
    case "4️⃣":
    case "4":
    case 4: {
      await handleTakeBreakRequest(driver, roomId, userData);
      break;
    }
    case "5️⃣":
    case "5":
    case 5: {
      await handleMedicineRequest(
        driver,
        roomId,
        userData,
        messageToBeProcessed,
        "DEFAULT"
      );
      break;
    }
    default: {
      return true;
    }
  }
};

module.exports = rootNavigation;
