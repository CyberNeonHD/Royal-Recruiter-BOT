const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');
const BM = require('../@leventhan/battlemetrics')


module.exports = {
    name: "BMStats",
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
        const target = options.getMember("steam id");
        tBM.getPlayerInfoBy("steamID", target).then((res) => {
            const message = "Get players info by searching on identifier.";
            console.log("=".repeat(message.length));
            console.log(message);
            console.log("=".repeat(message.length));
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        

    }
};


