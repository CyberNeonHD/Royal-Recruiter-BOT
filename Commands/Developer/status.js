const { Client, MessageEmbed, CommandInteraction } = require('discord.js');
const { connection } = require('mongoose');
require('../../Events/Client/ready');
const versionBot = "V0.8";

module.exports = {
    name: 'status',
    description: 'Displays the status of the client and database connection',

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} DiscordBot
     */
    async execute(interaction, DiscordBot) {
        const Response = new MessageEmbed();

        const recruitmentOfficerRole = interaction.guild.roles.cache.get("986374067038847008");
        const eventsOfficerRole = interaction.guild.roles.cache.get("803396496853958677");
        const adminOfficerRole = interaction.guild.roles.cache.get("810252560220946432");
        const communityOfficerRole = interaction.guild.roles.cache.get("989894740642263082");
        const clanLeaders = interaction.guild.roles.cache.get("458273481205874690");
        const founder = interaction.guild.roles.cache.get("726160366593376266");
        if(interaction.member.roles.cache.has(recruitmentOfficerRole.id) || interaction.member.roles.cache.has(adminOfficerRole.id) || interaction.member.roles.cache.has(eventsOfficerRole.id) || interaction.member.roles.cache.has(communityOfficerRole) || interaction.member.roles.cache.has(clanLeaders.id) || interaction.member.roles.cache.has(founder.id)){
            Response.setColor('BLUE');
            Response.setDescription(`**CLIENT**:\`🟩ONLINE🟩\` - \`${DiscordBot.ws.ping}ms\`\n **Uptime**: <t:${parseInt(DiscordBot.readyTimestamp/1000)}:R>\n
            **Database**: \`${connectionSwitch(connection.readyState)}\n`);
            Response.setFooter(`Current Version: ${versionBot}`);
        }
        else {
            Response.setColor('RED');
            Response.setDescription('🚩 Unauthorized to check my status.');
        }
        interaction.reply({embeds: [Response]});
    }
};

function connectionSwitch(value) {
    let status = " ";
    switch(value) {
        case 0: status = `🟥DISCONNECTED🟥`;
        break;
        case 1: status = `🟩CONNECTED🟩`;
        break;
        case 2: status = `🟨CONNECTING🟨`;
        break;
        case 3: status = `🟧DISCONNECTING🟧`;
        break;
    }
    return status;
}
