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
              sendMessageAPI(
                roomId,
                message,
                {
                  userName: userData.name,
                },
                userData,
                "TAKE_A_BREAK_REMINDER"
              );
            }
            break;
          }
          case "WATER_REMINDER": {
          }
          case "MEDICINE_REMINDER": {
            const isAplicableNow = medicineReminderHours.includes(currentHour);
            if (isAplicableNow) {
            }
          }
          default: {
            break;
          }
        }
        if (message && messageType) {
        }
      }
    );
    console.log("activeReminders", activeReminders);
  },
  {
    scheduled: false,
  }
);

module.exports = taskScheduler;
