const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "Give Prospect",
    description: "Give prospect role",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "new prospect",
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
        const target      = options.getMember("target") || interaction.member;
        const embed       = new MessageEmbed()
                            .setColor(`#${interaction.guild.roles.cache.get(role.id).color.toString(16)}`)
                            .setTitle("Prospect manager");

        if (!role.editable || role.position === 0) {
            embed.setDescription(`I cannot edit the ${role} role!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        embed.setDescription(target.roles.cache.has(role.id) ? `Removed the ${role} role from ${target}.` : `Added the ${role} role to ${target}.`);
        target.roles.cache.has(role.id) ? target.roles.remove(role) : target.roles.add(role);
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};
