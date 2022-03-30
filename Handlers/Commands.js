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

        if(!command.name)
        return Table.addRow(file.split("/")[7], "🚩 Failed", "Missing a name.")

        if(!command.description)
        return Table.addRow(command.name, "🚩 Failed", "Missing a description.")

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

        await Table.addRow(command.name, "✅ Succes");
        
    });
    console.log(Table.toString());
    //checking perms//
    DiscordBot.on('ready', async() =>{
        const MainGuild = await DiscordBot.guilds.cache.get('949717261210505266');

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const rolesName = Roles(r.name);
                if(!rolesName) return accumulator;

                const permissions = rolesName.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);

                return [...accumulator, {id: r.id, permissions}]
            }, []);

            await MainGuild.commands.permissions.set({ fullPermissions });

        });
    });
}