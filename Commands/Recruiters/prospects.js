const { MessageEmbed, CommandInteraction } = require('discord.js');
const Prospect = require('../../MongoDB/prospectSchema');
require('../../Events/Client/ready');

module.exports = {
    name: 'save',
    description: 'Save a new prospect here',
    permission: "MANAGE_ROLES",
    options: [
        {
            name: 'name',
            description: 'The name of the Prospect (not ready)',
            type: 'STRING',
            required: true,
        },
    ],


    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const Response = new MessageEmbed();
        Response.setColor('RED');
        Response.setDescription('🚩 Feature is not ready yet.');
        interaction.reply({embeds: [Response]});
        /*
        const { options } = interaction;
        const nameProspect = options.getString('prospect');

        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Saved to the database')
        .setDescription(`**Prospect saved**: ${nameProspect}`)
        .setThumbnail('https://i.imgur.com/0zHd6L9.png')
        .setTimestamp()

        interaction.reply({embeds: [Response], fetchReply: true});

        const today = new Date();
        const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
        await Prospect.create({
            name: nameProspect,
            remainingTime: date
        });
        */
    }
};


