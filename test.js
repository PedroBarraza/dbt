const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntent, GatewayIntentBits } = require('discord.js');
const { token }= require('./config.json');

console.log(token);

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) { //read up on this a bit better.
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.login(token);