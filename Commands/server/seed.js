const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');

module.exports = {
    name: "seed",
    description: "Start the seeding",
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        interaction.guild.setIcon("https://www.chriskankiewicz.com/images/blog/seedling.jpeg");

        const Response = new MessageEmbed();
        Response.setColor('GREEN');
        Response.setDescription('READY FOR SEEDING!');
        interaction.reply({embeds: [Response], ephemeral: true });
    }

};
