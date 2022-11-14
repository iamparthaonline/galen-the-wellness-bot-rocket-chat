const messages = require("../messages.json");

const constructMessage = (key, options, language = "en") => {
  let str = messages[key][language];
  Object.keys(options).forEach((varKey) => {
    str = str.replace(`__${varKey}__`, options[varKey] || "");
  });
  return str;
};

module.exports = constructMessage;
