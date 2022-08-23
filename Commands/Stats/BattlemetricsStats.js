const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');
const BM = require('../../node_modules/@leventhan/battlemetrics')
const options2 = {
    token: process.env.TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjI4MzVmMGFiNTZhY2ViZjAiLCJpYXQiOjE2NjExMjI2MDEsIm5iZiI6MTY2MTEyMjYwMSwiaXNzIjoiaHR0cHM6Ly93d3cuYmF0dGxlbWV0cmljcy5jb20iLCJzdWIiOiJ1cm46dXNlcjo1NDg1MTgifQ.yti2ZP6VAf6GQX5clSIby5kWFpd_mETryupDYarb4r4", // after v1.4.8 don't add Bearer!
    serverID: process.env.SerVER_ID || '4750113',
    game: process.env.GAME || 'squad'
};

// Put the options in the consturctor
const tBM = new BM(options2);


module.exports = {
    name: "bmstats",
    description: "get BM playtime",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "steam id",
            description: "Provide a BM id to check hours.",
            type: "STRING",
            required: true,
        },
    ],


    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const target = options.getString("steam id");
        const awaitExample = await tBM.getPlayerInfoBy(
            "steamID", target.toString()
        );
        const Response = new MessageEmbed();
        Response.setColor('GREEN');
        Response.setDescription(`${awaitExample}`);
        await interaction.reply({embeds: [Response], fetchReply: true });
        interaction.channel.send(`Player info by steam id`);
    }
};


