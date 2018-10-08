import { TELEGRAM_URL } from './constants';
import axios from 'axios';

class Bot {
  getBotInformation = async () => {
    try {
      const { data } = await axios(`${TELEGRAM_URL}${process.env.TOKEN}/getMe`);

      console.log(data);
    } catch (e) {
      throw new Error(e);
    }
  };
}

export default Bot;
