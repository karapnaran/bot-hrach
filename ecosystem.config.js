module.exports = {
  apps: [
    {
      name: "bot-hrach",
      script: "./index.js",
    },
    {
      name: "scrape-tus",
      script: "./Scripts/scrapeTusMoments.js",
      cron_restart: "*/30 * * * *",
      autorestart: false
    }
  ],
};