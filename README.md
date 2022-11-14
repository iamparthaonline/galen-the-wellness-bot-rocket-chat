# Galen 👋 - the wellness assistant

## Chatbot for RocketGov Hackathon 2022

#### By Team Fasalians

We are building a bot, which will help all rocket.chat users with their mental and physical well-being. We are building a very interactive bot with below features -

- Drinking Water reminder
- Mood enhancement
- Medicine Reminder
- Take a break reminder
- Health Information on Demand

#### Important links

- Idea Page - [Check Now](https://eventornado.com/submission/galen-the-wellness-bot#idea)
- Page Summary (Deliverable 1) - [Download](https://docs.google.com/document/d/1vLBA76FGz7txl0d7HZjea_jXaPZlk_je/edit?usp=sharing&ouid=104552500012939044703&rtpof=true&sd=true)
- Presentation (Deliverable 2) - [Download](https://docs.google.com/presentation/d/1No8LF9jLl2ZzIrkGPMbTGRE6w5DTdbTy/edit?usp=sharing&ouid=104552500012939044703&rtpof=true&sd=true)
- Video Pitch/Demo ( Deliverable 3 ) - [Watch](https://drive.google.com/file/d/165VV6Xvv1b-wKGTrUWbMTgnhgEy1djWS/view?usp=sharing)
- Our Journey - [Read](https://medium.com/@partha_roy/how-we-built-a-wellness-chatbot-for-rocketgov-hackathon-with-code-examples-e919d243b470)

![Our Project Poster](https://github.com/iamparthaonline/galen-the-wellness-bot-rocket-chat/raw/main/Galen-team-fasalians.png)

## Author

- Vishnu - [@Ruudeus](https://github.com/Ruudeus)
- Vedant - [@VedantS20](https://github.com/VedantS20)
- Mahima - [@mahima2499](https://github.com/mahima2499)
- Charchit - [@HowitzerGitHub](https://github.com/HowitzerGitHub)
- Partha - [@iamparthaonline](https://github.com/iamparthaonline)

## Installation

### Setup the system

- Install Node JS in your system first.
- Create a new account in your workspace for the bot
- Create API Tokens for the bot
- Create a Local/Server Mongo Instance to save your message data

### Update the .env config

Update the config in the .env file.

```javascript
HOST = "YOUR_WORKSPACE_ID.rocket.chat"
BOT_USER = "YOUR_BOT_USERNAME"
BOT_PASSWORD = "YOUR_BOT_PASSWORD"
BOTNAME = "YOUR_BOT_USERNAME"
SSL = true
RESPOND_TO_DM=true
LISTEN_ON_ALL_PUBLIC=true
MONGO_URL="MONGO_DB_URL"
MESSAGE_TIMEOUT=10000
CRON_TIME="10 * * * * *" #*/1 * * * *
AUTH_TOKEN="YOUR_BOT_SPECIFIC_AUTH_TOKEN"
AUTH_USER_ID="YOUR_BOT_SPECIFIC_AUTH_USER_ID"
API_URL="https://YOUR_WORKSPACE_ID.rocket.chat/api/v1/chat.postMessage"
CONTENT_SOURCE_URL="https://www.health.com"

```

### Run the bot server

Then run below commands,

```bash
    npm install
    npm start
```

## Documentation

- [ SDK Documentation](https://developer.rocket.chat/bots/creating-your-own-bot-from-scratch/develop-a-rocket.chat-sdk-bot)
