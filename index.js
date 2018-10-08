import Bot from './bot';

// Configuration env
require('dotenv').config();

const initApp = async () => {
  const bot = new Bot();
  await bot.getBotInformation();
};

initApp();
