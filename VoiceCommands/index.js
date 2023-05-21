const { ChannelType } = require("discord.js");
const { createAudioPlayer } = require("@discordjs/voice");
const { findVideoFromQuery } = require("./youtubeAudioStream");
const createQueue = require('./queue');
const createConnection = require('./connection');

const COMMANDS = {
  PLAY: "..play",
  PAUSE: "..pause",
  UNPAUSE: "..unpause",
  SKIP: "..skip",
  LEAVE: "..leave",
  QUEUE: "..queue"
}

const player = createAudioPlayer();
const queueManager = createQueue(player);
const connectionManager = createConnection(player, queueManager);

queueManager.registerPlayerWatchers();

const handleMessage = async (message) => {
  let messageContent = message.content.split(" ");
  let command = messageContent[0];
  let query = messageContent.slice(1).join(" ");

  switch (command) {
    case COMMANDS.PLAY:
      await handleSing(message, query);
      break;
    case COMMANDS.PAUSE:
      player.pause();
      break;
    case COMMANDS.SKIP:
      player.stop();
      break;
    case COMMANDS.UNPAUSE:
      player.unpause();
      break;
    case COMMANDS.QUEUE:
      message.reply(queueManager.showQueue());
      break;
    case COMMANDS.LEAVE:
      player.stop();
      connectionManager.destroy();
      queueManager.reset();
      break;
  }
}

async function handleSing(message, query) {
  const userId = message.author.id;
  const channel = message.guild.channels.cache.find(channel => {
    return channel.type === ChannelType.GuildVoice
      && channel.members.find(member => member.id === userId);
  });

  connectionManager.connect(channel);
  const video = await findVideoFromQuery(query);
  queueManager.addToQueue(video);
}

module.exports = handleMessage;
