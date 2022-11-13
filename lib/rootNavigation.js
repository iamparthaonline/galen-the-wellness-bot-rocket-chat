const handleMedicineRequest = require("../features/medicine");
const handleTakeBreakRequest = require("../features/takeBreak");
const handleWaterBreakRequest = require("../features/waterReminder");

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
      await handleWaterBreakRequest(driver, roomId, userData, undefined, "DEFAULT");
      break;
    }
    case "2️⃣":
    case "2":
    case 2: {
      // Charchit - Mood enhancer
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
