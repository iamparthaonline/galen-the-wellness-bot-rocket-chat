// https://developer.rocket.chat/reference/api/rest-api/endpoints/core-endpoints/chat-endpoints/postmessage

const axios = require("axios");
const { AUTH_TOKEN, AUTH_USER_ID, API_URL } = process.env;
const sendMessageAPI = (messageBody) => {
  var data = JSON.stringify(messageBody); //messageBogy is JSON object
  var config = {
    method: "post",
    url: API_URL,
    headers: {
      "X-Auth-Token": AUTH_TOKEN,
      "X-User-Id": AUTH_USER_ID,
      "Content-type": "application/json",
    },
    data: data,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(config);
      // save the message in DB
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = sendMessageAPI;

// const sendMessageAPI = require('./lib/sendMessageViaAPI')
// const messageBody = {

//         "roomId": "#hTYp3FYcRbFaSQ7WLnvfNxJSvmQznTm3HW",
//         "text":"hi"

// }
// sendMessageAPI(messageBody).then(res=>{
//     console.log(res)
// }).catch(err=>{console.log(err)})
