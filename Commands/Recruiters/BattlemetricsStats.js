const { MessageEmbed, CommandInteraction } = require('discord.js');
require('../../Events/Client/ready');

module.exports = {
    name: 'bmstats',
    description: 'Save a new prospect here (not ready)',
    permission: "MANAGE_ROLES",
    options: [
        {
            name: 'steam64id',
            description: 'The steam64id of the Prospect',
            type: 'STRING',
            required: true,
        },
    ],


    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const steam64id = options.getString('steam64id');
        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('testing')
        .setDescription(`**steam64id saved**: ${steam64id}\n`)


        interaction.reply({embeds: [Response], fetchReply: true});
    }
};