const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');

module.exports = {
    name: "prospect",
    description: "Give prospect role",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "user",
            description: "Provide a user to manage.",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const role        = interaction.guild.roles.cache.get("992212826238238771");
        const target      = options.getMember("user");
        const embed       = new MessageEmbed()
                            .setColor(`#${interaction.guild.roles.cache.get(role.id).color.toString(16)}`)
                            .setTitle("Prospect manager");

        if (!role.editable || role.position === 0) {
            embed.setDescription(`I cannot edit the ${role} role!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (target.roles.cache.has(role.id)){
            embed.setDescription("User has that role already??");
        }
        else {
            target.roles.add(role);
            const nameOfTarget = target.displayName;
            target.setNickname("P | " + nameOfTarget);
            embed.setDescription(`Added the ${role} role to ${target}.`);
        }
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};
