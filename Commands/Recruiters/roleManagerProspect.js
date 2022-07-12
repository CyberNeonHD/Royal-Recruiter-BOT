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
        const roleProspect = interaction.guild.roles.cache.get("706053335106715650");
        const roleSeeders = interaction.guild.roles.cache.get("505401465804685312");
        const target      = options.getMember("user");
        const embed       = new MessageEmbed()
                            .setColor(`#${interaction.guild.roles.cache.get(roleProspect.id).color.toString(16)}`)
                            .setTitle("Prospect manager");

        if ((!roleProspect.editable || roleProspect.position === 0) && (!roleSeeders.editable || roleSeeders.position === 0)){
            embed.setDescription(`I cannot edit the ${role} role!`);
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!target.roles.cache.has(roleSeeders.id)){
            target.roles.add(roleSeeders);
        }

        if ((target.roles.cache.has(roleProspect.id))){
            embed.setDescription("User has the prospect role already??");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else {
            const nameOfTarget = target.displayName;
            const channelProspects = interaction.guild.channels.cache.get("738327561062449174");
            const channelMentor = interaction.guild.channels.cache.get("988745961209737287");
            target.roles.add(roleProspect);

            if(nameOfTarget.substring(0, 5) === "RB | "){
                embed.setDescription("This person has RB tags??");
                return interaction.reply({ embeds: [embed]});
            }
            else if(nameOfTarget.substring(0, 4) !== "P | "){
                target.setNickname("P | " + nameOfTarget);
            }

            sendMentorNewProspectMessage(channelMentor, interaction, target);
            sendWelcomeMessageProspect(channelProspects, interaction, target);
            createProspectThread(interaction, nameOfTarget);
            embed.setDescription(`Prospect welcome message is posted in ${channelProspects}.\n${nameOfTarget} has the P tag.\nAdded the necessary roles to ${target}.`);
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
    const learnChannel = interaction.guild.channels.cache.get('723626350841298975').toString();

    channelProspects.send(
`@here
Please all welcome ${target}!
${target}, when you have time, check out ${expectationsChannel}.
Get to know your mentor and see your fellow teammates in ${meetMentorChannel}.
Give us a little info on yourself in ${meetProspectChannel} (whatever you are comfortable with sharing).
Let us know if you need to be put on hold or will be less active in ${goingAwayChannel}.
If you're feeling nice, shoot us a message in ${processFeedbackChannel}. We want to know how your experience is with us 🙂.
Btw do you want to upper your Squad plays? If so check out ${learnChannel}.
`);

}

function sendMentorNewProspectMessage(channelMentor, interaction, target) {
    const roleMentor = interaction.guild.roles.cache.get("988745375575863326");
    channelMentor.send(`${roleMentor}, we have ${target} that needs a new mentor.`);
}

async function createProspectThread(interaction, nameOfTarget){
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate() + 14;
    const month = date_ob.getMonth() + 1;

    await interaction.channel.threads.create({
        name: `${date}-${month} ${nameOfTarget}`,
        autoArchiveDuration: 10080, //10080 is 7 days -> https://discord.js.org/#/docs/main/stable/typedef/ThreadAutoArchiveDuration
        reason: 'New prospect thread',
    });
}
