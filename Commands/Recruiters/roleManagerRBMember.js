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
        const MembersInfoChannel = interaction.guild.channels.cache.get('985632771135373322');
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
            createMemberThread(MembersInfoChannel,target,interaction);
            //again all on 1 line due to spacing issues when message is posted in Discord.
            embed.setDescription(`RB Member welcome message is posted in ${channelProspects}.\n${role} added to ${target}.\n${oldRole} role removed from ${target}.\nGave ${target} fancy RB tags.`);
        }
        await interaction.reply({embeds: [embed], fetchReply: true});
    }
};

function sendWelcomeMessageProspect(channelProspects, interaction, target) {
    const codeOfConductChannel = interaction.guild.channels.cache.get('465089280629276672').toString();
    const meetMembersChannel = interaction.guild.channels.cache.get('458279712213565440').toString();
    const goingAwayChannel = interaction.guild.channels.cache.get('484262435994468363').toString();
    const feedbackChannel = interaction.guild.channels.cache.get('988757893119631380').toString();
    //again all left due to spacing issues when message is posted in Discord.
    channelProspects.send(
`@here.
Please join us in welcoming our newest member ${target}

Check out ${codeOfConductChannel} to know what we expect of you.
Fill out ${meetMembersChannel}, so we can get to know a little about you.
Let us know you are going away in ${goingAwayChannel}.
Also don't forget to give us feedback about your process in ${feedbackChannel}.
You can now also view and vote on prospect tickets. 
Please make sure to vote by clicking the reactions, and leave a message in the thread.

❤️ Welcome to the family ${target}! ❤️
`);

}

async function createMemberThread(MembersInfo,target,interaction){
    member = target.displayName.substring(4, target.displayName.length)
    const roleWLOf = interaction.guild.roles.cache.get("917911950120333323");
    thread = await MembersInfo.threads.create({
        name: `${member}`,
        autoArchiveDuration: 10080, //10080 is 7 days -> https://discord.js.org/#/docs/main/stable/typedef/ThreadAutoArchiveDuration
        reason: 'New member thread',
    });
    message = `${roleWLOf} please upgrade this new member to members WL`;
    await thread.send(message);
    
}
