const { Client, MessageEmbed } = require('discord.js')
const { connection } = require('mongoose');
const { execute } = require('../../Events/Client/ready');

module.exports = {
    name: 'status',
    description: 'Displays the status of the client and database connection',

    /**
     * 
     * @param {MessageEmbed} interaction 
     * @param {Client} DiscordBot 
     */
    async execute(interaction, DiscordBot) {
        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**CLIENT**:\`🟩ONLINE🟩\` - \`${DiscordBot.ws.ping}ms\`\n **Uptime**: <t:${parseInt(DiscordBot.readyTimestamp/1000)}:R>\n
        **Database**: \`${connectionSwitch(connection.readyState)}\``)

        interaction.reply({embeds: [Response]})
    }
}

function connectionSwitch(value) {
    let status = " ";
    switch(value) {
        case 0: status = `🟥DISCONNECTED🟥`
        break;
        case 1: status = `🟩CONNECTED🟩`
        break;
        case 2: status = `🟨CONNECTING🟨`
        break;
        case 3: status = `🟧DISCONNECTING🟧`
        break;
    }
    return status;
}