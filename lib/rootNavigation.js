const handleTakeBreakRequest = require("../features/takeBreak");
const showSearchWithContentTitle = require("../features/getContent/searchContent");
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
      break;
    }
    case "3️⃣":
    case "3":
    case 3: {
      await showSearchWithContentTitle(driver, roomId, userData);
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
      // Vishnu - Meds
      break;
    }
    default: {
      return true;
    }
  }
};

module.exports = rootNavigation;
