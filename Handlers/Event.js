const { Events } = require('../Validation/EventNames');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (DiscordBot) => {
    const Table = new Ascii('Event Loaded');

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}` , `🚩 Event name is invalid or missing: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once) {
            DiscordBot.once(event.name, (...args) => event.execute(...args, DiscordBot));
        }
        else {
            DiscordBot.once(event.name, (...args) => event.execute(...args, DiscordBot));
        };
        
        await Table.addRow(event.name, "✅ Succes")
    });

    console.log(Table.toString());

}