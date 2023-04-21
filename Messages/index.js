const { matcher } = require("../Lib");

const buildSimpleHandlers = () => {
  const mapping = [
    [
      ['hi Hrach', 'hey Hrach', 'hello Hrach', 'barev Hrach', 'բարև Հրաչ', 'հելլո Հրաչ'],
      'բարև'
    ],
    [
      ['hrach sus'],
      'ԽԻԵՍ ԲՈՉԿԱ ԳԼՈՐՈՒՄ ՎՐԵՍ!!!!'
    ],
    [
      ['kilo', 'kg', 'kilogram', 'կիլո', 'կգ', 'կիլոգրամ'],
      async (message) => {
        const orer = [
          'երեկ ',
          'էսօր ',
          'էն օրը '
        ];
        const tegher = [
          'տանը ',
          'ջիմում '
        ];
        const text = orer[Math.floor(Math.random()*orer.length)]+
          tegher[Math.floor(Math.random()*tegher.length)]+
          'կշռվեցի '+
          (Math.floor(Math.random() * (105 - 79) + 79)).toString() + ' կիլո էի';

        await message.reply(text);
      }
    ],
    [
      ['tonratun', 'qyabab', 'kebab', 'pizza', 'burger', 'lahmajo', 'lahmacun', 'shawarma', 'grill.am', 'քյաբաբ','պիցցա','բուրգեր','լահմաջո','շաուրմա','գրիլլ․ամ','թոնրատուն'],
      'կաինավ'
    ],
    [
      ['axper','ախպեր'],
      async (message) => {
        const janaxper = [
          'ջան ախպեր',
          'ոնց ախպեր',
          'բա ախպեր'
        ];
        await message.reply(janaxper[Math.floor(Math.random()*janaxper.length)])
      }
    ],
    [
      ['միբան','միբան', 'miban', 'miban', 'jackbox', 'ջեքբոքս', 'jackbox', 'ջեքբոքս', 'cs', 'ցս', 'fortnite', 'ֆորթնայթ', '@Ցս'],
      async (message) => {
        return Promise.all([
          await message.react('➕'),
          await message.react('➖')
        ])
      }
    ],
    [
      ['gm', 'գմ', 'gmgm', 'գմգմ'],
      async (message) => {
        return Promise.all([
          await message.react('🇬'),
          await message.react('🇲'),
          await message.react('<:baj:904686634518315019>')
        ])
      }
    ],
    [
      ['bg', 'gn', 'բգ', 'բգ', 'gngn', 'գնգն', 'գն'],
      async (message) => {
        return Promise.all([
          await message.react('🇬'),
          await message.react('🇳'),
          await message.react('<:gandz:798882493201252422>')
       ])
      }
    ],
    [
      ['aghaghay', 'աղաղայ'],
      async (message) => {
        return Promise.all([
          await message.react('🤝')
       ])
      }
    ],
    [
      ['նուպոգոդի', 'nupogodi'],
      async (message) => {
        await message.reply("https://imgur.com/a/iHlw97E")
      }
    ],
    [
      (text) => text.match(/😍/i),
      async (message) => {
        let srtikachqerovAI = Math.floor(Math.random() * 3);
        return srtikachqerovAI === 1 && await message.reply("ջան ախպեր")
      }
    ],
    [
      ['lolik', 'pomidor', 'tomato', 'պոմիդոր', 'լոլիկ', '🍅'],
      async (message) => {
        await message.reply("ֆաք 🍅")
      }
    ],
    [
      ['lol','լոլ','լօլ'],
      async (message) => {
        await message.reply("ֆաք lol")
      }
    ],
    [
      (text) => text.match(/(?<=^|\P{L})(\.)(?=\P{L}|$)/),
      async (message) => {
        return Promise.all([
          await message.react('🤬')
        ])
      }
    ],
    [
      (text) => text === '/tusbomb',
      async (message) => {
        const tusMoments = require('../tus.json');
        const shuffled = tusMoments.sort(() => 0.5 - Math.random());
        const tus = shuffled.slice(0, 5);

        let response = '';
        tus.forEach(message => {
          response += message.attachment;
          response += '\n';
        });

        await message.reply(response);
      }
    ]
  ];

  return mapping.map(item => {
    let matcherFunc;
    let handlerFunc;
    const [ match, handler ] = item;

    if (typeof match === 'function') {
      matcherFunc = match;
    } else {
      const regexp = matcher(...match);
      matcherFunc = (text) => text.match(regexp)
    }

    if (typeof handler === 'string') {
      handlerFunc = async (message) => await message.reply(handler);
    } else {
      handlerFunc = handler;
    }
    return [
      matcherFunc,
      handlerFunc
    ]
  })
}

const handlers = buildSimpleHandlers();

const handleMessage = async (message) => {
  const content = message.content;
  try {
    await Promise.all(handlers.filter(item => {
      const [ match ] = item;
      return match(content);
    }).map(item => {
      const [ , handle ] = item;
      return handle(message);
    }));
  } catch (e) {
    console.log(e);
  }

}

module.exports = handleMessage;
