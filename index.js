// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, User, Guild, ChannelType, ConnectionService } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

const { token } = require('./config.json');
const { ActivityType } = require('discord.js');
const { getPupul } = require('./Helpers');
const MessageHandler = require('./Messages');

const player = createAudioPlayer();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
});

let connection;
let queue = [];

// Log in to Discord with your client's token
client.login(token);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    c.user.setActivity('Belly Music', { type: ActivityType.Playing });

    // handle messages
    c.on('messageCreate', async (message) => {
        if (message.author.bot) {
            return;
        }

        await MessageHandler(message);

        let messageContent = message.content.split(" ");

        let command = messageContent[0];
        let query = messageContent.slice(1).join(" ");

        if (command === '::sing') {
            const userId = message.author.id;

            const channel = message.guild.channels.cache.find(channel => {
                return channel.type === ChannelType.GuildVoice
                    && channel.members.find(member => member.id === userId);
            });

            if (!connection) {
                connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
            }

            const videos = await ytsr(query || "Sia Chandelier", { pages: 1 });
            const firstVideo = videos.find(video => video.url);
            queue.push(firstVideo.url);

            if (player.state.status == AudioPlayerStatus.Idle) {
                const stream = getAudioStream(queue[0]);
                const resource = createAudioResource(stream);
                player.play(resource);
                queue.shift();
            }


            player.on(AudioPlayerStatus.Idle, () => {
                if (!queue.length) return;

                const stream = getAudioStream(queue[0]);
                const resource = createAudioResource(stream);
                player.play(resource);
                queue.shift();
            });

            connection.subscribe(player);
        }

        else {
            switch (command) {
                case '::pause':
                    player.pause();
                    break;
                case '::play':
                    player.unpause();
                    break;
                case '::skip':
                    player.stop();
                    break;
                case '::leave':
                    !connection ? message.reply('Gtfo') : connection.destroy();
                    connection = undefined;
                    player.stop();
                    queue = [];
                    break;
            }
        }

        // legacy
        // if (message.content === 'miban') {
        //     message.reply('miban');
        // }
    })

    // handle commands
    c.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'pupulachap') {
            const user = interaction.options.get('user');
            const id = user.value;
            const content = getPupul(id);

            interaction.reply(`<@${id}>` + '-ի պուպուլը ՝ \n \n' + content);
        }
    });
});

const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

function getAudioStream(url) {
    return ytdl(url, { filter: 'audioonly', format: 'webm' });
}
