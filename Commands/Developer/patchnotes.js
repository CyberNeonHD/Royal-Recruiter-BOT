const {MessageEmbed, CommandInteraction } = require('discord.js');
require('../../Events/Client/ready');

module.exports = {
    name: 'patchnotes',
    description: 'Displays the latest patchnotes of the bot',

    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Response = new MessageEmbed();
        Response.setColor('#0099ff');
        Response.setTitle('Patch Notes');
        Response.setThumbnail('https://i.imgur.com/0zHd6L9.png');
        Response.setDescription(`- Fixed thread dating `)
        .setFooter({ text: 'Last updated and tested on 28/07/2022', iconURL: 'https://i.imgur.com/0zHd6L9.png' });

        interaction.reply({embeds: [Response], fetchReply: true});
    }
};