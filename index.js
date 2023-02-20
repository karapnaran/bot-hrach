// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { ActivityType } = require('discord.js');
const { getPupul } = require('./Helpers');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Log in to Discord with your client's token
client.login(token);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    c.user.setActivity('Belly Music', { type: ActivityType.Playing });

    // handle messages
    c.on('messageCreate', (message) => {
        if (message.author.bot) {
            return;
        }
        if (message.content === 'miban') {
            message.reply('miban');
        }
    })

    // handle commands
    c.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'pupulachap') {
            console.log(interaction);

            const userId = 894153328353759243;
            // userId = interaction.user.id ??? 

            const content = getPupul(userId);
            interaction.reply(content);
        }

        //       if (interaction.commandName === 'ping') {
        //           await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
        //       };

    });
});