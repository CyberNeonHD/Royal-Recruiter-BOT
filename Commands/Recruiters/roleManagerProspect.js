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
            const nameOfTarget = target.displayName;
            target.roles.add(role);
            target.setNickname("P | " + nameOfTarget);

            sendWelcomeMessageProspect(interaction, target);
            embed.setDescription(`Prospect welcome message is posted.\nI also added the ${role} role to ${target}.`);
        }
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};

function sendWelcomeMessageProspect(interaction, target) {
    const channelProspects = interaction.guild.channels.cache.get("956199691282944042");
    const expectationsChannel = interaction.guild.channels.cache.get('949717343934750800').toString();
    const meetMentorChannel = interaction.guild.channels.cache.get('949717343934750800').toString();
    const meetProspectChannel = interaction.guild.channels.cache.get('949717343934750800').toString();
    const goingAwayChannel = interaction.guild.channels.cache.get('949717343934750800').toString();
    const processFeedbackChannel = interaction.guild.channels.cache.get('949717343934750800').toString();

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
