const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');

module.exports = {
    name: "live",
    description: "Server is live",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        interaction.guild.setIcon("https://3.bp.blogspot.com/-U7znXhqUB3k/XFMr_UBkEbI/AAAAAAAAAGM/TuJ3VtsPIp4xTyaeBj1_S-OmoBuZDokOACKgBGAs/s1600/GIF-190125_173358.gif");

        const Response = new MessageEmbed();
        Response.setColor('GREEN');
        Response.setDescription('WE ARE LIVE');
        interaction.reply({embeds: [Response], ephemeral: true });
    }

};
