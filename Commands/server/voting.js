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
        const Response = new MessageEmbed();
        Response.setColor('BLUE');
        Response.setDescription(`React with <:VOTEYES:843159948317163570> or <:VOTENO:843159948090933288>.\n Or ❔ if you havent met them/played with them yet.
        Please write the reason you have put this answer on the thread.`);
        const message = await interaction.reply({embeds: [Response], fetchReply: true });
        message.react('<:VOTEYES:843159948317163570>');
        message.react('<:VOTENO:843159948090933288>');
        message.react('❔');

        interaction.channel.send(`${roleRB} Please vote on the prospect :)`);
    }
};


