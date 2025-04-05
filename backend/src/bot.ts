import TelegramBOT from "node-telegram-bot-api";

import Start from "./commands/start";
import Stats from "./commands/stats";

const token = process.env.TELEGRAM_BOT!;

const bot = new TelegramBOT(token, { polling: true });

bot.onText(/\/start/, Start);

bot.onText(/\/stats/, Stats);

export default bot;
