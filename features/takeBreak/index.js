/**
 * Take a break reminder
    - If a user has been online for more than 3 hours then nudge the user to take a break
    - Depending on the time of the day we can suggest the user do something else 
      ( walking, star gazing, doing small talk, etc ) - 
 */
const sendMessage = require("../../lib/sendMessage");
const constructMessage = require("../../lib/constructMessage");
const reminderModel = require("../../schema/Reminder");
const messageModel = require("../../schema/Message");

handleTakeBreakRequest = async (
  driver,
  roomId,
  userData,
  selectedInput,
  lastMessageType
) => {
  const { name, language, username } = userData;

  /** If user has selected Back to Main Menu option */
  if (
    typeof selectedInput !== "undefined" &&
    ["0️⃣", 0, "0"].indexOf(selectedInput.trim()) > -1
  ) {
    return true;
  }

  /**
   * Check user configuration for whether it's already active or not
   */
  const activeReminderDetails = await reminderModel.findOne({
    roomId,
    isActive: true,
    username: userData.username,
    reminderType: "TAKE_BREAK",
  });

  if (lastMessageType === "TAKE_BREAK_REMINDER_STAT") {
    if ([6, "6", "6️⃣"].indexOf(selectedInput) > -1) {
      /**Stop the scheduler */
      await activeReminderDetails.updateOne({ isActive: false });

      await sendMessage(
        driver,
        constructMessage("takeBreakReminderStoppedMessage", {
          userName: userData.name,
          hours: parseInt(selectedInput),
        }),
        roomId,
        false,
        userData,
        "TAKE_BREAK_REMINDER_STOP"
      );
      return false;
    } else if ([0, "0", "0️⃣"].indexOf(selectedInput) > -1) {
      return true;
    }
  }
  if (activeReminderDetails) {
    /**
     * User already has take a break running
     * Show him from when he has been using it
     * Show him how many times he has taken a break
     * Give options of "Ok, Cool" | "Stop the reminder"
     */
    const count = await messageModel
      .find({ roomId, messageType: "TAKE_A_BREAK_REMINDER" })
      .count();

    await sendMessage(
      driver,
      constructMessage("alreadyTakeBreakReminderRunningMessage", {
        userName: userData.name,
        interval: activeReminderDetails.remindAt.interval,
        count: `${count}`,
      }),
      roomId,
      false,
      userData,
      "TAKE_BREAK_REMINDER_STAT"
    );
  } else {
    /**
     * User doesn't have it active
     * so show him details about it and then
     * let him choose the interval 2h | 3h | 4h
     * Show a congratulations message
     * Setup the cron
     */
    if (selectedInput) {
      let intervalHour;
      switch (selectedInput) {
        case "1️⃣":
        case "1":
        case 1: {
          intervalHour = 1;
          break;
        }
        case "2️⃣":
        case "2":
        case 2: {
          intervalHour = 2;
          break;
        }
        case "3️⃣":
        case "3":
        case 3: {
          intervalHour = 3;
          break;
        }
        case "4️⃣":
        case "4":
        case 4: {
          intervalHour = 4;
          break;
        }
        default: {
          await sendMessage(
            driver,
            constructMessage("wrongInputMessage"),
            roomId,
            true,
            userData,
            "WRONG_INPUT"
          );
          return false;
        }
      }

      /**
       * Store the reminder details in DB
       */
      const breakReminderData = {
        roomId,
        username,
        reminderType: "TAKE_BREAK",
        remindAt: {
          interval: parseInt(selectedInput),
        },
        createdAt: new Date(),
        isActive: true,
      };
      const reminderToBeSaved = new reminderModel(breakReminderData);
      await reminderToBeSaved.save();
      await sendMessage(
        driver,
        constructMessage("takeBreakReminderCongratsMessage", {
          userName: userData.name,
          hours: parseInt(selectedInput),
        }),
        roomId,
        false,
        userData,
        "TAKE_BREAK_MENU"
      );
    } else {
      await sendMessage(
        driver,
        constructMessage("takeBreakMenuMessage", {
          userName: userData.name,
        }),
        roomId,
        true,
        userData,
        "TAKE_BREAK_MENU"
      );
    }
  }
};

module.exports = handleTakeBreakRequest;
