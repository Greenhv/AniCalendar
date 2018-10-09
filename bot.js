import TelegramBot from 'node-telegram-bot-api';
import { MASTERANI_API_URI, MASTERANI_WEB_URI } from './constants';

require('axios-debug-log');

import axios from 'axios';

// Configuration env
require('dotenv').config();

class Bot {
  constructor() {
    this.bot = new TelegramBot(process.env.TOKEN, {
      polling: true,
    });
  }

  onText = () => {
    this.bot.onText(/\/anime (.+)/, async (msg, match) => {
      try {
        const animeName = match[1];
        const { data } = await axios(`${MASTERANI_API_URI}search`, {
          params: {
            search: animeName,
            sb: true,
          },
        });
        const results = data.map(anime => ({
          text: anime.title,
          callback_data: anime.slug,
        }));

        this.bot.sendMessage(
          msg.chat.id,
          'Which of these are you searching ?',
          {
            reply_markup: {
              inline_keyboard: [results],
            },
          }
        );
      } catch (e) {
        throw new Error(e);
      }
    });
  };

  onCallbackQuery = () => {
    this.bot.on('callback_query', async callbackQuery => {
      const message = callbackQuery.message;
      const msgStr = `You can follow this link to see the new episode ${MASTERANI_WEB_URI}info/${
        callbackQuery.data
      }`;

      this.bot.sendMessage(message.chat.id, msgStr);
    });
  };

  init = () => {
    this.onText();
    this.onCallbackQuery();
  };
}

export default Bot;
