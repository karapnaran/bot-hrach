const { VoiceConnectionStatus, joinVoiceChannel, entersState } = require("@discordjs/voice");

function connection(player, queue) {
  let connection;

  return {
    getConnection() {
      return connection;
    },
    connect(channel) {
      connection = this.createConnectionIfNotExists(channel);
      return this;
    },
    createConnectionIfNotExists(channel) {
      if (!connection || connection.state.status === VoiceConnectionStatus.Disconnected) {
        connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Disconnected, async () => {
          try {
            await Promise.race([
              entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
              entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
            ]);
          } catch (error) {
            connection.destroy();
            queue.reset();
          }
        });

        connection.subscribe(player);

        return connection;
      }
    }
  }
}

module.exports = connection;
