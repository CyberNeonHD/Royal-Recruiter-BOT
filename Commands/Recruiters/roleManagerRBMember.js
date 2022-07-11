const { CommandInteraction, MessageEmbed } = require("discord.js");
require('../../Events/Client/ready');

module.exports = {
    name: "rbmember",
    description: "Give rbmember role",
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
        const role        = interaction.guild.roles.cache.get("528574587747958794");
        const oldRole     = interaction.guild.roles.cache.get("706053335106715650");
        const target      = options.getMember("user");
        const embed       = new MessageEmbed()
                            .setColor(`#${interaction.guild.roles.cache.get(role.id).color.toString(16)}`)
                            .setTitle("RB Member manager");

        if (!role.editable || role.position === 0) {
            embed.setDescription(`I cannot edit the ${role} role!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (target.roles.cache.has(role.id)){
            embed.setDescription("User has that role already??");
        }
        else {
            const nameOfTarget = target.displayName;
            target.roles.add(role);
            target.roles.remove(oldRole);
            target.setNickname("RB | " + nameOfTarget.substring(4, nameOfTarget.length));

            const channelProspects = interaction.guild.channels.cache.get("460898033794809856");
            sendWelcomeMessageProspect(channelProspects, interaction, target);
            embed.setDescription(`RB Member welcome message is posted in ${channelProspects}.\n${role} added to ${target}.
            \n${oldRole} role removed from ${target}.\nGave ${target} fancy RB tags.`);
        }
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};

function sendWelcomeMessageProspect(channelProspects, interaction, target) {
    const codeOfConductChannel = interaction.guild.channels.cache.get('465089280629276672').toString();
    const meetMembersChannel = interaction.guild.channels.cache.get('458279712213565440').toString();
    const goingAwayChannel = interaction.guild.channels.cache.get('484262435994468363').toString();
    const feedbackChannel = interaction.guild.channels.cache.get('988757893119631380').toString();
    channelProspects.send(
`@here.
Please join us in welcoming our newest member ${target}

Check out ${codeOfConductChannel} to know what we expect of you.
Fill out ${meetMembersChannel}, so we can get to know a little about you.
Let us know you are going away in ${goingAwayChannel}.
Also don't forget to give us feedback about your process in ${feedbackChannel}.

❤️ Welcome to the family ${target}! ❤️
`);

}
