const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

function getAudioStreamFromUrl(url) {
  return ytdl(url, { filter: 'audioonly' });
}

async function findVideoFromQuery(query) {
  const videos = await ytsr(query || "Sia Chandelier", { pages: 1 });
  return videos.items.find(video => video.url);
}

module.exports = {
  getAudioStreamFromUrl,
  findVideoFromQuery
};
