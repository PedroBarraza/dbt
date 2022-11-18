const { SlashCommandBuilder, Client, ConnectionService } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, createAudioResource, VoiceConnection, StreamType } = require('@discordjs/voice');
const ytSearch = require('yt-search');
const YTDL = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays audio into the voice channel.')
        .addStringOption(option =>
            option
            .setName('ytlink')
            .setDescription('link')
            .setRequired(true)),
    async execute(interaction) {
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        global.connection.subscribe(player);
        const ytlink = interaction.options.getString('ytlink');
        const stream = await (YTDL(ytlink, {filter: "audioonly"}));
        const resource = createAudioResource(stream);
        player.play(resource);
        await interaction.reply({content: `Tocando ${ytlink}`, });
    }
}