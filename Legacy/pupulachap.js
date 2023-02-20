const BOT_USER_ID = 894153328353759243;

function getPupul() {
    let pupul_len = Math.floor(Math.random() * 20);
    let pupul = '8=';
    for (let i = 0; i < pupul_len; i++) {
        pupul += '=';
    }
    pupul += 'D';
    return pupul;
}

const userId = Object.values(context.params.event.data.resolved.users)[0].id;
/*
let member = await guild.members.cache.get(userId);
let femaleRole = message.guild.roles.find("name", "Админ");
const memberRoles = member.roles.cache
.filter((roles) => roles.id == `${hasRoles}`)
.map((role) => role.toString());
await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: memberRoles,
  message_reference: {
    message_id: context.params.event.id
  }
});
*/
if (userId == BOT_USER_ID) {
    await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: ``,
        embed: {
            fields: [{
                name: 'պուպուլաչափ',
                value: `Հրաչի պուպուլը\``,
            }, ],
        },
    });
    return await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `https://imgur.com/a/sMcThzv`,
    });
} else
    await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: '',
        embed: {
            //title: 'պուպուլաչափ',
            //type: 'rich',
            //color: 0x00AA00, // Green color
            //description: 'առնանդամի երկարություն չափող սարք',
            fields: [{
                name: 'պուպուլաչափ',
                value: [`<@!${userId}>-ի պուպուլը\``, pupul].join('\n'),
            }, ],
        },
        tts: false,
    });