const { Client, Events, GatewayIntent, GatewayIntentBits } = require('discord.js');
const { token }= require('./config.json');

console.log(token);

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.login(token);