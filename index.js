const { Client } = require('discord.js');
const DiscordBot = new Client({intents:32767})
const { Token } = require('./config.json')
require("./Handlers/Events")(DiscordBot);

DiscordBot.login(Token);