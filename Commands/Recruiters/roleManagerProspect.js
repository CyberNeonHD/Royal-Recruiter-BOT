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
            embed.setDescription(`I'm lacking perms to do this command!`);
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
            syncChannelPermissions(interaction);
            //all on one line, otherwise spacing issues. Not sure why Discord has this issue.
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
    
//for some reason it needs to be towards the whole left, otherwise I have spacing issues?
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
//this is nasty I will fix when I have time!
function sendMentorNewProspectMessage(channelMentor, interaction, target) {
    const roleMentor = interaction.guild.roles.cache.get("988745375575863326");
    const teamAhmed = interaction.guild.roles.cache.get("988742885568548914");
    const teamAtem = interaction.guild.roles.cache.get("991120083726368849");
    const teamBlame = interaction.guild.roles.cache.get("991120575814696970");
    const teamBuck = interaction.guild.roles.cache.get("991119543873310791");
    const teamCyber = interaction.guild.roles.cache.get("988743418345828382");
    const teamFloop = interaction.guild.roles.cache.get("991120425285337198");
    const teamMatt = interaction.guild.roles.cache.get("988743108797800468");
    const teamMiau = interaction.guild.roles.cache.get("991314621107535923");
    const teamRosie = interaction.guild.roles.cache.get("986281624733896715");
    const teamSog = interaction.guild.roles.cache.get("991120227649732708");

    channelMentor.send(`${roleMentor}, we have ${target} that needs a new mentor.`).then(async function (message) {
        await message.react("<:teamahmed:993294138231492608>")
        await message.react("<:teamatem:993288379288526878>")
        await message.react("<:teamblame::993288443453001849>")
        await message.react("<:teambuck:993294321665183854>")
        await message.react("<:teamcyber:993294235300274186>")
        await message.react("<:teamfloop:993288237550415932>")
        await message.react("<:teammatt:993294083541966868>")
        await message.react("<:teammiau:993288158416490496>")
        await message.react("<:teamrosie:993288056163532930>")
        await message.react("<:teamsog:993288308765491260>")
        await message.awaitReactions((user) => user.id == message.author.id,
        { max: 1, time: 900000 }).then(collected => {
            switch(console.log(collected.first().emoji.name)){
                case "<:teamahmed:993294138231492608>":{
                    target.roles.add(teamAhmed);
                    break;
                }
                case "<:teamatem:993288379288526878>":{
                    target.roles.add(teamAtem);
                    break;
                }
                case "<:teamblame::993288443453001849>":{
                    target.roles.add(teamBlame);
                    break;
                }
                case "<:teambuck:993294321665183854>":{
                    target.roles.add(teamBuck);
                    break;
                }
                case "<:teamcyber:993294235300274186>":{
                    target.roles.add(teamCyber);
                    break;
                }
                case "<:teamfloop:993288237550415932>":{
                    target.roles.add(teamFloop);
                    break;
                }
                case "<:teammatt:993294083541966868>":{
                    target.roles.add(teamMatt);
                    break;
                }
                case "<:teammiau:993288158416490496>":{
                    target.roles.add(teamMiau);
                    break;
                }
                case "<:teamrosie:993288056163532930>":{
                    target.roles.add(teamRosie);
                    break;
                }
                case "<:teamsog:993288308765491260>":{
                    target.roles.add(teamSog);
                    break;
                }
            }
        }).catch(() => {
            message.reply('No reaction after 15 minutes, operation canceled');
        });
    
    })
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

function syncChannelPermissions(interaction) {
    interaction.channel.lockPermissions();
}
