const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "role",
    description: "Manage a user's roles.",
    permission: "MANAGE_ROLES",
    options: [
        {
            name: "role",
            description: "Provide a role to add or remove.",
            type: "ROLE",
            required: true,
        },
        {
            name: "target",
            description: "Provide a user to manage.",
            type: "USER",
            required: false,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const role        = options.getRole("role");
        const target      = options.getMember("target") || interaction.member;
        const embed       = new MessageEmbed()
                            .setColor(`#${interaction.guild.roles.cache.get(role.id).color.toString(16)}`)
                            .setTitle("🎭 Role Management 🎭");

        if (!role.editable || role.position === 0) {
            embed.setDescription(`I cannot edit the ${role} role!`)
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        embed.setDescription(target.roles.cache.has(role.id) ? `Removed the ${role} role from ${target}.` : `Added the ${role} role to ${target}.`);
        target.roles.cache.has(role.id) ? target.roles.remove(role) : target.roles.add(role);
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};
