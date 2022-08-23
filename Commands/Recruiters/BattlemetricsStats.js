const { MessageEmbed, CommandInteraction } = require('discord.js');
require('../../Events/Client/ready');
const BM = require('@leventhan/battlemetrics');
const bmoptions = {
    token: process.env.TOKEN || "eyJhbGcieyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA5OGUzZDA0YmY5OGY4M2YiLCJpYXQiOjE2NjEyOTI4MDIsIm5iZiI6MTY2MTI5MjgwMiwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo1NDg1MTgifQ.TAR4EDRXFssH2Og2aU6hJoO-7C33gSYrQLR5p1x0KfwOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4MzVmMGFiNTZhY2ViZjAiLCJpYXQiOjE2NjExMjI2MDEsIm5iZiI6MTY2MTEyMjYwMSwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo1NDg1MTgifQ.yti2ZP6VAf6GQX5clSIby5kWFpd_mETryupDYarb4r4", // after v1.4.8 don't add Bearer!
    serverID: process.env.SerVER_ID || '4750113',
    game: process.env.GAME || 'squad'
};
const tBM = new BM(bmoptions);

module.exports = {
    name: 'bmstats',
    description: 'bm player stats (not ready)',
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


        
        tBM.getPlayerInfoBy("steamID", `${steam64id}`).then((res) => {
            const message = "Get players info by searching on identifier.";
            interaction.reply("=".repeat(message.length));
            interaction.reply(`${message}`);
            interaction.reply("=".repeat(message.length));
            interaction.reply(`${res}`);
        }).catch(err => {
            interaction.reply(err);
        });


        const Response = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('testing')
        .setDescription(`**steam64id saved**\n`)


        interaction.reply({embeds: [Response], fetchReply: true});
    }
};