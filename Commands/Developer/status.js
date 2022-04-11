const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const { connection } = require('mongoose');
require('../../Events/Client/ready');

module.exports = {
    name: 'status',
    description: 'Displays the status of the client and database connection',

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} DiscordBot 
     */
    async execute(interaction, DiscordBot) {
        const Response = new MessageEmbed()
        let target = interaction.options.getMember("target") || interaction.member;
        await target.user.fetch();

        if(target.user.id !=`558245349458706433`){
            Response.setColor('RED')
            Response.setDescription('🚩 Unauthorized to check my status.')
        }
        else {
            Response.setColor('BLUE')
            Response.setDescription(`**CLIENT**:\`🟩ONLINE🟩\` - \`${DiscordBot.ws.ping}ms\`\n **Uptime**: <t:${parseInt(DiscordBot.readyTimestamp/1000)}:R>\n
            **Database**: \`${connectionSwitch(connection.readyState)}\``)
        }
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