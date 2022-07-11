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
        Response.addFields(
            { name: '\u200B', value: `- When P tag is already on the name, the bot won't add it anymore\n- Added training tips to prospect welcome message.\n- When using /prospect it will now give the seeding role unless the prospect has it already.` },
        )
        .setFooter({ text: 'Last update  on 12/07/2022', iconURL: 'https://i.imgur.com/0zHd6L9.png' });

        interaction.reply({embeds: [Response], fetchReply: true});
    }
};