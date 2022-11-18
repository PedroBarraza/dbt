const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel, VoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Connects to your voice channel of choice')
        .addChannelOption(option => 
            option
            .setName('channel')
            .setDescription('Voice channel to join.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)),
    async execute(interaction) {
        const voiceChannel = interaction.options.getChannel('channel');
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        global.connection = voiceConnection;
        await interaction.reply({content: 'Connected!', ephemeral: true});
    },
};