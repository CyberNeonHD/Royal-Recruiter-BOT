const { Client, Collection } = require('discord.js');
const DiscordBot = new Client({intents:32767});

require("./Handlers/Events")(DiscordBot);
require("./Handlers/Commands")(DiscordBot);

DiscordBot.commands = new Collection();

DiscordBot.login(process.env.DSJ_Token);