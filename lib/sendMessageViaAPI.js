const axios = require('axios')

const sendMessageAPI = (messageBody)=>{
var data = JSON.stringify(messageBody); //messageBogy is JSON object
var config = {
  method: 'post',
  url: 'https://team-fasal-hackathon.rocket.chat/api/v1/chat.postMessage',
  headers: { 
    'X-Auth-Token': 'eYXxVbOVbCFrY9CJ2vzR2Y-nk7ZiUuXj6Rauc7qA8hd', 
    'X-User-Id': 'hTYp3FYcRbFaSQ7WL', 
    'Content-type': 'application/json'
  },
  data : data
};

return new Promise(async(resolve,reject)=>{
    try {
        const response = await axios(config)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

    
}

module.exports = sendMessageAPI


// const sendMessageAPI = require('./lib/sendMessageViaAPI')
// const messageBody = {
    
//         "roomId": "#hTYp3FYcRbFaSQ7WLnvfNxJSvmQznTm3HW",
//         "text":"hi"
      
// }
// sendMessageAPI(messageBody).then(res=>{
//     console.log(res)
// }).catch(err=>{console.log(err)})