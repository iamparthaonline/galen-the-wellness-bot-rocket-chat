const cron = require("node-cron");
const moment = require("moment");
const sendMessageAPI = require("../sendMessageViaAPI");

const reminderModel = require("../../schema/Reminder");
const userModel = require("../../schema/User");

const taskScheduler = cron.schedule(
  process.env.CRON_TIME,
  async () => {
    console.log("running every minute", new Date());
    const activeReminders = await reminderModel.find({ isActive: true });
    const currentHour = +moment().format("H");
    activeReminders.forEach(
      async ({
        reminderType,
        roomId,
        remindAt: { interval } = {},
        username,
        medicineReminderHours,
      }) => {
        const userData = await userModel.findOne({ username });
        let message, messageType;
        switch (reminderType) {
          case "TAKE_BREAK": {
            const isAplicableNow = currentHour % interval;
            if (isAplicableNow === 0) {
              message = "takeBreakReminderMessage";
              messageType = "TAKE_A_BREAK_REMINDER";
            }
            break;
          }
          case "WATER_REMINDER": {
            message = "drinkWaterReminderMessage";
            messageType = "DRINK_WATER_REMINDER";
            break;
          }
          case "MEDICINE_REMINDER": {
            const isAplicableNow = medicineReminderHours.includes(currentHour);
            if (isAplicableNow) {
              message = "medicineReminderMessage";
              messageType = "TAKE_MEDICINE_REMINDER";
            }
            break;
          }
          default: {
            break;
          }
        }
        if (message && messageType) {
          try {
            await sendMessageAPI(
              roomId,
              message,
              {
                userName: userData.name,
              },
              userData,
              messageType
            );
          } catch (e) {
            console.log("error", e);
          }
        }
      }
    );
  },
  {
    scheduled: false,
  }
);

module.exports = taskScheduler;
