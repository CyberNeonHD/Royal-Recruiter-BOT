const { MessageEmbed, CommandInteraction } = require('discord.js');
const liveIcon = require('../../MongoDB/liveSchema');
require('../../Events/Client/ready');

module.exports = {
    name: 'setlive',
    description: 'Save new live icon',
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: 'link',
            description: 'Set the live icon',
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
        const icon = options.getString('link');
        const Response = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('New live icon')
        .setDescription(`**The new icon is saved**`)
        .setThumbnail(icon)
        .setTimestamp();
        interaction.reply({embeds: [Response], fetchReply: true}).catch( () => {
            const Response = new MessageEmbed()
            .setColor('RED')
            .setTitle(`**ERROR CRASH PREVENTED**`)
            .setDescription(`Did you insert a link??`);c
            interaction.reply({embeds: [Response], fetchReply: true});
        });
        await liveIcon.updateOne({
            live: icon,
            id: 1
        });
    }
};
