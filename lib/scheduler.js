const cron = require("node-cron");
const reminderModel = require("../schema/Reminder");

const taskScheduler = cron.schedule(
  process.env.CRON_TIME,
  async () => {
    console.log("running every minute", new Date());
    const activeReminders = await reminderModel.find({ isActive: true });
    console.log("activeReminders", activeReminders);
  },
  {
    scheduled: false,
  }
);

module.exports = taskScheduler;
