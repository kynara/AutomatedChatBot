let bot = new RiveScript();

const BotType = {
    GREETING: 1,
    CASHIER: 2,
};

let botType = BotType.GREETING;

const general = [
    './brain.rive'
];

const service = [
    './brain.rive'
];

const package = [
    './brain.rive'
];

bot.loadFile(general).then(botReady).catch(botNotReady);

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    selfReply(input_box.value);
    input_box.value = '';
});

function botReply(message){
    console.log("BOT SAY WHA: " + message);

    message_container.innerHTML += `<div class="bot">${message}</div>`;
    location.href = '#edge';
}

function selfReply(message){
    message_container.innerHTML += `<div class="self">${message}</div>`;
    location.href = '#edge';

    let filtered = filter(message)
    if (filtered == null) {
        message = message.toLowerCase();
        filtered = message;
    }
    console.log(filtered);

    bot.reply("local-user", filtered).then(function(reply) {
        botReply(reply);
    });
}

function botReady(){
    bot.sortReplies();
    botReply('Hello. Welcome to our smart customer service bot. What can I help you with?');
    botReply('You can say anything from "Bad service" to "Package Tracking"');
}

function botNotReady(err){
    console.log("An error has occurred.", err);
}

function filter(message) {
    message = message.toLowerCase();
    return message.match(/(package)|(tracking)|(delivery)|(service)|(representative)/g);
}