const { Client, Collection, MessageEmbed } = require('discord.js');
const DiscordBot = new Client({intents:46859});
const PREFIX = '!';

DiscordBot.commands = new Collection();
require("./Handlers/Events")(DiscordBot);
require("./Handlers/Commands")(DiscordBot);

DiscordBot.login(process.env.DSJ_Token);

const seed = require('./MongoDB/seedSchema');
const live = require('./MongoDB/liveSchema');
DiscordBot.on('messageCreate', async (messageCreate) => {
    if(!messageCreate.content.startsWith(PREFIX)|| messageCreate.author.bot) return;
    const arg = messageCreate.content.slice(PREFIX.length).split(/ +/);
    const command= arg.shift().toLowerCase();
    if (command === 'seed'){
        const linkSeed = await seed.find({id: 1});
        messageCreate.guild.setIcon(linkSeed[0].seed);
    }
    else if(command === 'live'){
        const linkLive = await live.find({id: 1});
        messageCreate.guild.setIcon(linkLive[0].live);
    }

});
