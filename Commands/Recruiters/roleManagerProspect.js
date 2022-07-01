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
        const role        = interaction.guild.roles.cache.get("706053335106715650");
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
            const nameOfTarget = target.displayName;
            target.roles.add(role);
            target.setNickname("P | " + nameOfTarget);

            const channelProspects = interaction.guild.channels.cache.get("738327561062449174");
            sendWelcomeMessageProspect(channelProspects, interaction, target);
            embed.setDescription(`Prospect welcome message is posted in ${channelProspects}.\nI also added the ${role} role to ${target}.`);
        }
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};

function sendWelcomeMessageProspect(channelProspects, interaction, target) {
    const expectationsChannel = interaction.guild.channels.cache.get('988757844700569640').toString();
    const meetMentorChannel = interaction.guild.channels.cache.get('988757957443465266').toString();
    const meetProspectChannel = interaction.guild.channels.cache.get('988757737850667028').toString();
    const goingAwayChannel = interaction.guild.channels.cache.get('988757678874587186').toString();
    const processFeedbackChannel = interaction.guild.channels.cache.get('988757893119631380').toString();

    channelProspects.send(
`@here
Welcome ${target}
When you have time. Check out ${expectationsChannel}.
Get to know your mentor and see your fellow teammates in ${meetMentorChannel}.
Give us a little info on yourself in ${meetProspectChannel} (whatever you are comfortable with sharing).
Let us know if you need to be put on hold or will be less active in ${goingAwayChannel}.
If you're feeling nice, shoot us a message in ${processFeedbackChannel}. We want to know how your experience is with us 🙂.
`);

}
