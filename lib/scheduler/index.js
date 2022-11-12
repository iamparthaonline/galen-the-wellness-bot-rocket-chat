const cron = require("node-cron");
const moment = require("moment");

const reminderModel = require("../../schema/Reminder");

const taskScheduler = cron.schedule(
  process.env.CRON_TIME,
  async () => {
    console.log("running every minute", new Date());
    const activeReminders = await reminderModel.find({ isActive: true });
    const currentHour = moment().format("H");
    activeReminders.forEach(
      async ({ reminderType, roomId, remindAt: { interval }, username }) => {
        switch (reminderType) {
          case "TAKE_BREAK": {
            const isAplicableNow = currentHour % interval;
            if (isAplicableNow === 0) {
            }
          }
          default: {
            break;
          }
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
