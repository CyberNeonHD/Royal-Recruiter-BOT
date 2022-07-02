const { MessageEmbed, CommandInteraction } = require('discord.js');
const Prospect = require('../../MongoDB/prospectSchema');
require('../../Events/Client/ready');

module.exports = {
    name: 'save',
    description: 'Save a new prospect here (not ready)',
    permission: "MANAGE_ROLES",
    options: [
        {
            name: 'name',
            description: 'The name of the Prospect',
            type: 'STRING',
            required: true,
        },
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
        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('NOT WORKING')
        .setDescription(`**Work in progress**`)
        .setThumbnail('https://i.imgur.com/0zHd6L9.png')
        .setTimestamp();

        interaction.reply({embeds: [Response], fetchReply: true});
        /*
        const { options } = interaction;
        const nameProspect = options.getString('name');
        const steam64id = options.getString('steam64id');

        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Saved to the database')
        .setDescription(`**Prospect saved**: ${nameProspect}\n**steam64id saved**:${steam64id}`)
        .setThumbnail('https://i.imgur.com/0zHd6L9.png')
        .setTimestamp()

        interaction.reply({embeds: [Response], fetchReply: true});

        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
        await Prospect.create({
            name: nameProspect,
            steam64id:steam64id,
            enrollment: date
        });
        */
    }
};


