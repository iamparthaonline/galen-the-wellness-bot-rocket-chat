const constructMessage = require("../../lib/constructMessage");
const sendMessage = require("../../lib/sendMessage");
const messageModel = require("../../schema/Message");
const reminderModel = require("../../schema/Reminder");

handleWaterBreakRequest = async (
  driver,
  roomId,
  userData,
  selectedInput,
  lastMessageType
) => {
  const { name, language, username } = userData;
  const activeReminder = await reminderModel.findOne({
    isActive: true,
    roomId,
    reminderType: "WATER_REMINDER",
  });
  if (lastMessageType === "DEFAULT") {
    if (activeReminder) {
      const count = await messageModel
        .find({ roomId, messageType: "WATER_REMINDER_MESSAGE" })
        .count();
      await sendMessage(
        driver,
        constructMessage(
          "alreadyTakeWaterReminderRunningMessage",
          { userName: username, count: `${count}` },
          language
        ),
        roomId,
        false,
        userData,
        "TAKE_WATER_BREAK_REMINDER_STOP"
      );
    } else {
      await sendMessage(
        driver,
        constructMessage("takeWaterBreakReminderFirstMessage", {}, language),
        roomId,
        false,
        userData,
        "TAKE_WATER_BREAK_REMINDER_STAT"
      );
    }
  } else if (lastMessageType === "TAKE_WATER_BREAK_REMINDER_STAT") {
    if (["1️⃣", "1", 1].includes(selectedInput.trim())) {
      const breakReminderData = {
        roomId,
        username,
        reminderType: "WATER_REMINDER",
        createdAt: new Date(),
        isActive: true,
      };
      const reminderToBeSaved = new reminderModel(breakReminderData);
      await reminderToBeSaved.save();
      await sendMessage(
        driver,
        constructMessage(
          "takeWaterBreakReminderCongratsMessage",
          { userName: username },
          language
        ),
        roomId,
        false,
        userData,
        "TAKE_WATER_BREAK_REMINDER_STAT"
      );
      return true;
    } else if (["2️⃣", "2", 2].includes(selectedInput.trim())) {
      return true;
    }
  } else if (lastMessageType === "TAKE_WATER_BREAK_REMINDER_STOP") {
    if (["6️⃣", "6", 6].includes(selectedInput.trim())) {
      await activeReminder.updateOne({ isActive: false });
      await sendMessage(
        driver,
        constructMessage(
          "takeWaterReminderStoppedMessage",
          { userName: username },
          language
        ),
        roomId,
        false,
        userData,
        "TAKE_WATER_BREAK_REMINDER_STOPPED"
      );
      return true;
    } else if (["0️⃣", "0", 0].includes(selectedInput.trim())) {
      return true;
    }
  }
};

module.exports = handleWaterBreakRequest;
