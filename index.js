const { Client, Collection } = require('discord.js');
const DiscordBot = new Client({intents:46859});

DiscordBot.commands = new Collection();

require("./Handlers/Events")(DiscordBot);
require("./Handlers/Commands")(DiscordBot);

DiscordBot.login("OTU1NzUxMTk4NjMwMjQ0Mzcy.YjmOqg.mViYcoDMnHNOfxQo9NRYtuJl55I");
