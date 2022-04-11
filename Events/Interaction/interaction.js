const {Client, MessageEmbed, CommandInteraction} = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} DiscordBot 
     */
    async execute(interaction, DiscordBot) {
        if(interaction.isCommand()) {
            const command = DiscordBot.commands.get(interaction.commandName)
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚩 An error occured while handling this command.')
            ]}) && DiscordBot.commands.delete(interaction.commandName);

            command.execute(interaction, DiscordBot)
        }

    }
}