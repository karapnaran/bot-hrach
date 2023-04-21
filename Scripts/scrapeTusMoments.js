/**
 * This is a standalone script that will scrape tusmoment thread
 */

const TUS_THREAD_ID = 1093110043886485574;

const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(token);

client.once(Events.ClientReady, c => {
  const channel = c.channels.cache.get('1093110043886485574');
  channel.messages.fetch({ limit: 100 }).then(messages => {
    const tusMomentArray = [];
    messages.forEach(message => {
      if(message.attachments) {
        const attachments = Array.from(message.attachments.values());
        if(!attachments[0]) return;
        const { attachment } = attachments[0];
        tusMomentArray.push({ attachment, createdAt: message.createdTimestamp })
      }
    });

    //TODO check timestamps in TusMoments... :3
    fs.writeFileSync(__dirname + '/../tus.json', JSON.stringify(tusMomentArray));
    client.destroy();
  })
});