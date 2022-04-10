const { MessageEmbed, CommandInteraction } = require('discord.js');
const mongoose = require('mongoose');
const { connection } = require('mongoose');
const { execute } = require('../../Events/Client/ready');

module.exports = {
    name: 'prospects',
    description: 'Save a new prospect here',
    options: [
        {
            name: 'Prospect name',
            description: 'The name of the Prospect',
            required: true,
            type: 'STRING',
        }
    ],

    /**
     * 
     * @param {MessageEmbed} interaction 
     */
    async execute(interaction) {
        const { options } = CommandInteraction;
        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(options.getString('Prospect name'))

        await interaction.reply({embeds: [Response]})
    }
}

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    remainingTime: {
        type: String,
        required: true
    }
})
