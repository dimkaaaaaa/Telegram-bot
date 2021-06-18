//npm init -y
//npm i telegraf@3.32
//nodemon echobot.js
//Telegram: @echo5000bot
//Group: BotDebugGroup


const Telegraf = require('telegraf');

const bot = new Telegraf('1235736101:AAGyxnpRn023fzH8uQIXLFuxmBNsSCiJP1o');

const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
/echo - say "You said echo"
/echo <msg> - echo a message
`;

bot.use((ctx, next) => {
    if(ctx.updateSubTypes[0] == "text"){
        bot.telegram.sendMessage(-485672371, ctx.from.username + " said: " + ctx.message.text);
    } else {
        bot.telegram.sendMessage(-485672371, ctx.from.username + " sent: " + ctx.updateSubTypes[0]);
    }
    next();
})

bot.start((ctx) => {
    ctx.reply("Здраствуйте вас приветствует сам Господин Димаш!!!");
    ctx.reply(helpMessage);
})

bot.help((ctx) => {
    ctx.reply(helpMessage);
})

bot.command('echo', (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    console.log(inputArray);

    let message = "";

    if (inputArray.length == 1){
        message = "You said echo";
    }else {
        inputArray.shift();
        message = inputArray.join(" ");
    }
        ctx.reply(message);
})

bot.launch()
