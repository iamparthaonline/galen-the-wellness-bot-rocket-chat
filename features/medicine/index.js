const constructMessage = require("../../lib/constructMessage");
const sendMessage = require("../../lib/sendMessage");

const reminderModel = require("../../schema/Reminder");

const handleMedicineRequest = async (
  driver,
  roomId,
  userData,
  selectedInput,
  lastMessageType
) => {
  selectedInput = selectedInput.trim();
  if (!selectedInput) return true;

  const { name, language, username } = userData;

  if (lastMessageType === "DEFAULT") {
    const activeReminder = await reminderModel.findOne({
      roomId,
      isActive: true,
      username,
      isActive: true,
      reminderType: "MEDICINE_REMINDER",
    });
    if (activeReminder) {
      await sendMessage(
        driver,
        constructMessage(
          "medicineStopMenu",
          {
            hours: activeReminder.medicineReminderHours,
          },
          "en"
        ),
        roomId,
        true,
        userData,
        "MEDICINE_REMINDER_STOP"
      );
    } else
      await sendMessage(
        driver,
        constructMessage("medicineMainMenu", {}, "en"),
        roomId,
        true,
        userData,
        "MEDICINE_REMINDER"
      );
    //
  } else if (lastMessageType === "MEDICINE_REMINDER") {
    if (["0️⃣", 0, "0"].includes(selectedInput)) return true;
    else if (["1️⃣", 1, "1"].includes(selectedInput)) {
      await sendMessage(
        driver,
        constructMessage("medicineMenuEnterHours", {}, "en"),
        roomId,
        true,
        userData,
        "MEDICINE_REMINDER_ENTER_HOURS"
      );
    }
    //
  } else if (lastMessageType === "MEDICINE_REMINDER_ENTER_HOURS") {
    let hours = selectedInput.split(",").map((x) => x.trim());

    const correctInput = hours.every(
      (hour) => /^\d+$/.test(hour) && +hour > -1 && +hour < 24
    );

    if (!correctInput) {
      await sendMessage(
        driver,
        constructMessage("medicineMenuEnterHoursWrongInput", {}, "en"),
        roomId,
        true,
        userData,
        "MEDICINE_REMINDER_ENTER_HOURS"
      );
      //
    } else {
      hours = hours.map((hour) => +hour);

      const medicineReminderData = {
        roomId,
        username,
        reminderType: "MEDICINE_REMINDER",
        createdAt: new Date(),
        isActive: true,
        medicineReminderHours: hours,
      };
      const reminderToBeSaved = new reminderModel(medicineReminderData);
      await reminderToBeSaved.save();

      await sendMessage(
        driver,
        constructMessage("medicineReminderEnterHoursSuccess", {}, "en"),
        roomId,
        true,
        userData,
        "MEDICINE_REMINDER"
      );
    }
  } else if (lastMessageType === "MEDICINE_REMINDER_STOP") {
    if (["0️⃣", 0, "0"].includes(selectedInput)) return true;
    else if (["1️⃣", 1, "1"].includes(selectedInput)) {
      const activeReminder = reminderModel.findOne({
        roomId,
        isActive: true,
        username,
        isActive: true,
        reminderType: "MEDICINE_REMINDER",
      });
      await activeReminder.updateOne({ isActive: false });
      await sendMessage(
        driver,
        constructMessage("medicineReminerStopSuccess", {}, "en"),
        roomId,
        true,
        userData,
        "MEDICINE_REMINDER_STOP"
      );
      return true;
    }
  }
};

module.exports = handleMedicineRequest;
