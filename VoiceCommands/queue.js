const { getAudioStreamFromUrl } = require("./youtubeAudioStream");
const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

function queue(player) {
  let queue = [];

  return {
    addToQueue(video) {
      queue.push(video);
      if (player.state.status === AudioPlayerStatus.Idle) {
        this.playNextInQueue();
      }
    },
    reset() {
      queue = []
    },
    playNextInQueue() {
      const stream = getAudioStreamFromUrl(queue[0].url);
      console.log(queue[0]);
      const resource = createAudioResource(stream);
      player.play(resource);
      queue.shift();
    },
    registerPlayerWatchers() {
      player.on(AudioPlayerStatus.Idle, () => {
        if (!queue.length) return;
        this.playNextInQueue()
      });
    }
  }
}

module.exports = queue;
