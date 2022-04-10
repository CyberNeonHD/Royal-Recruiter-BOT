const { Client, Collection } = require('discord.js');
const DiscordBot = new Client({intents:32767})
const { Token } = require('./config.json')

require("./Handlers/Events")(DiscordBot);
require("./Handlers/Commands")(DiscordBot);

DiscordBot.commands = new Collection();

DiscordBot.login(Token);