const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

function getAudioStreamFromUrl(url) {
  return ytdl(url, { filter: 'audioonly' });
}

async function findVideoFromQuery(query) {
  const videos = await ytsr(query || "Sia Chandelier", { pages: 1 });
  return normalizeVideo(videos.items.find(video => video.url));
}

function normalizeVideo(video) {
  // very important
  // we don't want to query youtube again for the corrent video, so we just replace url :3
  if(video.url === 'https://www.youtube.com/watch?v=TUVcZfQe-Kw') {
    return {
      ...video,
      url: 'https://www.youtube.com/watch?v=WHuBW3qKm9g',
      title: "Dua Lipa - Levitating (correct version)"
    }
  }
  return video;
}
module.exports = {
  getAudioStreamFromUrl,
  findVideoFromQuery
};
