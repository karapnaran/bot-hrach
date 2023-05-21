const { getAudioStreamFromUrl } = require("./youtubeAudioStream");
const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");

function queue(player) {
  let queue = [];

  return {
    addToQueue(video) {
      queue.push(video);
      if ([AudioPlayerStatus.Idle, AudioPlayerStatus.AutoPaused].includes(player.state.status)) {
        this.playCurrentInQueue();
      }
    },
    reset() {
      queue = []
    },
    playCurrentInQueue() {
      if(!queue.length) return;

      const stream = getAudioStreamFromUrl(queue[0].url);
      const resource = createAudioResource(stream);
      player.play(resource);
    },
    registerPlayerWatchers() {
      player.on(AudioPlayerStatus.Idle, () => {
        if (!queue.length) return;
        queue.shift();
        this.playCurrentInQueue()
      });
    },
    showQueue() {
      if(queue.length) {
        return queue.reduce((prev, cur, index) => {
          return prev + `\n${index + 1}: ${cur.title}`;
        }, '');
      }
      return "Queue is empty";
    }
  }
}

module.exports = queue;
