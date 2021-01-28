const { Telegraf } = require('telegraf');
const Telegram = require('telegraf/telegram');
require('dotenv').config();
const scrapper = require('./scrapper');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Bienvenido, solo envía la url del clip (Solo soporta Twitch)');
});

bot.on('text', async (ctx) => {
  const message = ctx.message.text;

  if (message.includes('https://clips.twitch.tv/')) {
    const id = (await ctx.reply('Espera unos segundos')).message_id;

    const video = await scrapper(message);

    ctx.deleteMessage(id);

    await ctx.reply(`#${video.name}`);
    await ctx.replyWithVideo(`https:${video.url}`);
  } else {
    const id = ctx.message.message_id;
    const bot_id = (await ctx.reply('No es un clip de Twitch')).message_id;

    ctx.deleteMessage(id);
    ctx.deleteMessage(bot_id);
  }
});

bot.launch();
