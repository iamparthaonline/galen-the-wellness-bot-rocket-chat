/**
 * Take a break reminder
    - If a user has been online for more than 3 hours then nudge the user to take a break
    - Depending on the time of the day we can suggest the user do something else 
      ( walking, star gazing, doing small talk, etc ) - 
 */
const sendMessage = require("../../lib/sendMessage");
const {
  takeBreakReminderFirstMessage,
  noInputMessage,
} = require("../../messages.json");

handleTakeBreakRequest = async (driver, roomId, userData) => {
  /**
   * Check user configuration for whether it's already active or not
   */
  /**
   * User doesn't have it active
   * so show him details about it and then
   * let him choose the interval 2h | 3h | 4h
   * Show a congratulations message
   * Setup the cron
   */
  const { name, language } = userData;
  replyMessage = takeBreakReminderFirstMessage[language].replace(
    "__userName__",
    name
  );
  await sendMessage(driver, replyMessage, roomId);
  setTimeout(async () => {
    /**
     * check whether user has replied after this message or not
     */
    await sendMessage(driver, noInputMessage[language], roomId);
  }, 5000);
  /**
   * User already has take a break running
   * Show him from when he has been using it
   * Show him how many times he has taken a break
   * Give options of "Ok, Cool" | "Stop the reminder"
   */
};

module.exports = handleTakeBreakRequest;
