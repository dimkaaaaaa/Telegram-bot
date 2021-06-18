//npm init -y
//npm i telegraf axios
//nodemon bot.js
//Telegram: cryptonews3000bot

const Telegraf = require('telegraf');

const axios = require('axios');

const bot = new Telegraf('1099928776:AAFN8z4hMqcC1j8VnQHj1Qb0EgB2KoJ3ZUc');

const apikey = 'd2cadf140d5ed8fcb9975dc8d40b1a4d1799feff82367c65489b09ae090ea669';

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})

function sendStartMessage(ctx){
    let startMessage = `Welcome, this bot gives you cryptocurrency information`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Crypto Prices', callback_data: 'price'}
                ],
                [
                    {text: 'CoinMarketCap', url: 'https://coinmarketcap.com/'}
                ],
                [
                    {text: 'Bot Info', callback_data: 'info'}
                ]
            ]
        }
    })
}

bot.command('start', ctx => {
    sendStartMessage(ctx);
})

bot.action('price', ctx => {
    let priceMessage = `Get Price Information. Select one of the cryptocurrencies below`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
        {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'BTC', callback_data: 'price-BTC'},
                    {text: 'ETH', callback_data: 'price-ETH'}
                ],
                [
                    {text: 'BCH', callback_data: 'price-BCH'},
                    {text: 'LTC', callback_data: 'price-LTC'}
                ],
                [
                    {text: 'Back to Menu', callback_data: 'start'}
                ],
            ]
        }
    })
})

let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC']

bot.action(priceActionList, async ctx => {
    console.log(ctx);
    let symbol = ctx.match.split('-')[1];
    console.log(symbol);
    try{
        let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD,EUR&api_key=${apikey}`);
        let data = res.data.DISPLAY[symbol].USD

let message = `
Symbol: ${symbol}
Price: ${data.PRICE}
Open: ${data.OPENDAY}
High: ${data.HIGHDAY}
Low: ${data.LOWDAY}
Supply: ${data.SUPPLY}
Market Cap: ${data.MKTCAP}
`;

ctx.deleteMessage();
bot.telegram.sendMessage(ctx.chat.id, message, {
    reply_markup: {
        inline_keyboard: [
            [
                {text: 'Back to Price', callback_data: 'price'}
            ]
        ]
    }
})
    }catch(err){
        console.log(err);
        ctx.reply('Error Encountered');
    }
})


bot.action('info', ctx => {
    ctx.answerCbQuery();
    bot.telegram.sendMessage(ctx.chat.id, "Bot Info", {
        reply_markup: {
            keyboard: [
                [
                    {text: 'Credits'},
                    {text: "API"}
                ],
                [
                    {text: 'Remove Keyboard'},
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})


bot.hears('Credits', ctx => {
    ctx.reply('This bot was made by @dimashka')
})

bot.hears('API', ctx => {
    ctx.reply('This bot uses cryptocompare API');
})

bot.hears('Remove Keyboard', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Removed Keyboard', 
    {
        reply_markup: {
            remove_keyboard: true
        }
    })
})


bot.launch();