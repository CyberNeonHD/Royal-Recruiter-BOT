const { MessageEmbed, CommandInteraction } = require('discord.js');
const seedIcon = require('../../MongoDB/seedSchema');
require('../../Events/Client/ready');

module.exports = {
    name: 'setseed',
    description: 'Save new seed icon',
    permission: "MANAGE_CHANNELS",
    options: [
        {
            name: 'link',
            description: 'Set the seet icon',
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
        .setTitle('New seed icon')
        .setDescription(`**The new icon is saved**`)
        .setThumbnail(icon)
        .setTimestamp();
        interaction.reply({embeds: [Response], fetchReply: true}).catch( () => {
            const Response = new MessageEmbed()
            .setColor('RED')
            .setTitle(`**ERROR: CRASH PREVENTED**`)
            .setDescription(`Did you insert a link??`);
            interaction.reply({embeds: [Response], fetchReply: true});
        });
        await seedIcon.updateOne({
            seed: icon,
            id: 1
        });
    }
};
