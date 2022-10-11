const { Perms } = require('../Validation/Permissions');
const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

/**
 * @param {Client} DiscordBot
 */
module.exports = async (DiscordBot) => {
    const Table = new Ascii('Command Loaded');

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name){
            return Table.addRow(file.split("/")[7], "🚩 Failed", "Missing a name.");
        }

        if(!command.description){
            return Table.addRow(command.name, "🚩 Failed", "Missing a description.");
        }

        if(command.permission) {
            if(Perms.includes(command.permission)){
                command.defaultPermission = false;
            }
            else{
                return Table.addRow(command.name, "🚩 Failed", "Permission is invalid.");
            }

        }

        DiscordBot.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ Success");

    });
    console.log(Table.toString());
    //checking perms//
    DiscordBot.on('ready', async () => {
        const mainGuild = await DiscordBot.guilds.cache.get("458272992892420108");
        const SecondGuild = await DiscordBot.guilds.cache.get("949717261210505266");

        if(mainGuild!== undefined){
            mainGuild.commands.set(CommandsArray);
        }
        if(SecondGuild!== undefined){
            SecondGuild.commands.set(CommandsArray);
        }
    });

};
