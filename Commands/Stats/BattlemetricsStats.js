const { MessageEmbed, CommandInteraction } = require('discord.js');
const Prospect = require('../../MongoDB/prospectSchema');
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
        interaction.reply(`testing ${steam64id}`);
    }
};