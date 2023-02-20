// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//TODO rename
const matcher = (...args) => {
  const searchStr = `(${args.join('|')})`
  const regexpString = `(?<=^|\\P{L})${searchStr}(?=\\P{L}|$)`
  return new RegExp(regexpString, 'iu')
}


// Only respond to messages containing the word "hi", "hey", "hello", "barev", "բարև" or "հելլո"
if (context.params.event.content.match(matcher('hi Hrach', 'hey Hrach', 'hello Hrach', 'barev Hrach', 'բարև Հրաչ', 'հելլո Հրաչ'))) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'բարև',
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing the word "Hrach sus"
if (context.params.event.content.match(matcher('hrach sus'))) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'ԽԻԵՍ ԲՈՉԿԱ ԳԼՈՐՈՒՄ ՎՐԵՍ!!!!',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing the word "kilo", "kg", "kilogram", "կիլո", "կգ" or "կիլոգրամ"
var orer = [
  'երեկ ',
  'էսօր ',
  'էն օրը '
];
var tegher = [
  'տանը ',
  'ջիմում '
];
if (context.params.event.content.match(/(?<=^|\P{L})(kilo|kg|kilogram|կիլո|կգ|կիլոգրամ)(?=\P{L}|$)/iu)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: orer[Math.floor(Math.random()*orer.length)]+
             tegher[Math.floor(Math.random()*tegher.length)]+
             'կշռվեցի '+
             (Math.floor(Math.random() * (105 - 79) + 79)).toString() + ' կիլո էի',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing the word "tonratun", "kebab", "pizza", "burger", "lahmajo", "lahmacun", "shawarma" or "grill.am"
if (context.params.event.content.match(/\btonratun\b|\bqyabab\b|\bkebab\b|\bpizza\b|\bburger\b|\blahmajo\b|\blahmacun\b|\bshawarma\b|\bgrill\.am\b/i)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'կաինավ',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing the word "քյաբաբ", "պիցցա", "բուրգեր", "լահմաջո", "շաուրմա", "գրիլլ․ամ" or "թոնրատուն"
if (context.params.event.content.match(/(?<=^|\P{L})(քյաբաբ|պիցցա|բուրգեր|լահմաջո|շաուրմա|գրիլլ․ամ|թոնրատուն)(?=\P{L}|$)/iu)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'կաինավ',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

var janaxper = [
  'ջան ախպեր',
  'ոնց ախպեր',
  'բա ախպեր'
];
// Only respond to messages containing the word "axper"
if (context.params.event.content.match(/(?<=^|\P{L})(axper|ախպեր)(?=\P{L}|$)/iu)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: janaxper[Math.floor(Math.random()*janaxper.length)],
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing "😍"
let srtikachqerovrandom = Math.floor(Math.random() * 3);
if (context.params.event.content.match(/😍/i) && srtikachqerovrandom == 1){
 await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'ջան ախպեր',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing "lol" or "լոլ"
if (context.params.event.content.match(/(?<=^|\P{L})(lol|լոլ|լօլ)(?=\P{L}|$)/iu)){
 await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'ֆաք lol',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing "lolik", "pomidor", "tomato", "պոմիդոր" or "լոլիկ"
if (context.params.event.content.match(/(?<=^|\P{L})(lolik|լոլիկ|pomidor|tomato|պոմիդոր)(?=\P{L}|$)/iu)){
 await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'ֆաք 🍅',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

// Only respond to messages containing "."
if (context.params.event.content.match(/(?<=^|\P{L})(\.)(?=\P{L}|$)/)){
  let result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `🤬`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  return result;
}

//ավելի նորմալ ձև կգրեմ հետո, կամ էլ չէ, եսիմ
// Only respond to messages containing "միբան", "միբան?", "miban", "miban?" or "jackbox?", "jackbox", "ջեքբոքս", "ջեքբոքս?"
if (context.params.event.content.match(/(?<=^|\P{L})(միբան|միբան\?|miban|miban\?|jackbox\?|ջեքբոքս\?|jackbox|ջեքբոքս)(?=\P{L}|$)/)){
  let result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `➕`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `➖`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  return result;
}

// Only respond to messages containing "aghaghay" or "աղաղայ"
if (context.params.event.content.match(/(?<=^|\P{L})(aghaghay|աղաղայ)(?=\P{L}|$)/)){
  let result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `🤝`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  return result;
}

// Only respond to messages containing "gm" or "գմ"
if (context.params.event.content.match(/(?<=^|\P{L})(gm|գմ)(?=\P{L}|$)/iu)){
  let result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `🇬`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `🇲`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `<:baj:904686634518315019>`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  return result;
}

// Only respond to messages containing "bg", "բգ", "gn" or "գն"
if (context.params.event.content.match(/(?<=^|\P{L})(gn|գն|bg|բգ)(?=\P{L}|$)/iu)){
  let result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `🇬`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `🇳`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  result = await lib.discord.channels['@0.2.0'].messages.reactions.create({
    emoji: `<:gandz:798882493201252422>`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  return result;
}

// Only respond to messages containing "nupogodi" or "նուպոգոդի"
if (context.params.event.content.match(/(?<=^|\P{L})(նուպոգոդի|nupogodi)(?=\P{L}|$)/iu)){
 await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'https://imgur.com/a/iHlw97E',
    allowed_mentions: { // "allowed_mentions" with this parameter prevents a ping
      replied_user: false
    },
    message_reference: {
      message_id: context.params.event.id
    }
  });
}