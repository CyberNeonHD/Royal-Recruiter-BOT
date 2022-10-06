const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');

module.exports = {
    name: "voting",
    description: "Vote on the prospect",
    permission: "MANAGE_ROLES",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const roleRB = interaction.guild.roles.cache.get("528574587747958794");
        const roleCadet = interaction.guild.roles.cache.get("976384794923503657");
        const roleWLOf = interaction.guild.roles.cache.get("917911950120333323");

        const Response = new MessageEmbed();
        Response.setColor('BLUE');
        Response.setDescription(`React with <:VOTEYES:843159948317163570> or <:VOTENO:843159948090933288>.\nOr ❔ if you havent met them/played with them yet.\nPlease write the reason you have put this answer on the thread.`);
        const message = await interaction.reply({embeds: [Response], fetchReply: true });
        message.react('<:VOTEYES:843159948317163570>');
        message.react('<:VOTENO:843159948090933288>');
        message.react('❔');

        interaction.channel.send(`${roleRB} and ${roleCadet}, please vote on the prospect :)`);
        interaction.channel.send(`${roleWLOf}, Please add WL to this player! xoxo`);
    }
};


