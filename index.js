const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
dotenv.config();

const TOKEN  = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN,{polling:true});

bot.on('message',(msg)=>{
    const text = msg.text;

    console.log("Message received: ", text);

    bot.sendMessage(msg.chat.id, "You said: " + text);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can I help you?");
});


bot.onText(/\/joke/,async (msg)=>{
    const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'  // This ensures the response is in JSON format
        }
    });
    const joke = response.data.joke; 
    bot.sendMessage(msg.chat.id, joke);
})