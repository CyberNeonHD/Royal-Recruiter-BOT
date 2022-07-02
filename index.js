const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const DiscordBot = new Client({intents:46859});


DiscordBot.commands = new Collection();

require("./Handlers/Events")(DiscordBot);
require("./Handlers/Commands")(DiscordBot);

DiscordBot.login(process.env.DSJ_Token);
