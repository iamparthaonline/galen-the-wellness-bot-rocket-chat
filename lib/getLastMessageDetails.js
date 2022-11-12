const moment = require("moment");
const messageModel = require("../schema/Message");

const getLastMessageDetails = async (roomId) => {
  /**
   * Last message in input interval which needs to be continued
   */
  const lastMessageDetails = await messageModel
    .findOne({
      roomId,
      createdAt: {
        $gt: moment()
          .subtract(process.env.MESSAGE_TIMEOUT / 1000, "seconds")
          .toDate(),
      },
      messageType: { $nin: ["USER_MESSAGE", "WRONG_INPUT"] },
    })
    .sort([["createdAt", -1]]);

  return lastMessageDetails;
};

module.exports = getLastMessageDetails;
