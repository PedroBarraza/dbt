const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Connection test'),
    async execute(interaction) {
        
        const user = interaction.options.getUser('target');
        if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL()}`);
        return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
    },
};