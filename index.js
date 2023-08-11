const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', function(message) {
    const stringUserOption = message.body.toLowerCase();

    if (stringUserOption != "paper" && stringUserOption != "rock" && stringUserOption != "scissors") {
        message.reply("You need to send me your option, 'paper', 'rock' or 'scissors'");
        return;
    }

    const stringComputerOption = getStringComputerOption();

    if ((stringUserOption == "paper" && stringUserOption == "rock") || (stringUserOption == "rock" && stringComputerOption == "scissors") || (stringUserOption == "scissors" && stringComputerOption == "paper")) {
        client.sendMessage(message.from, "User win");
    } else if (stringUserOption == stringComputerOption) {
        client.sendMessage(message.from, "Draw");
    } else {
        client.sendMessage(message.from, "Computer win");
    }

    client.sendMessage(message.from, "Computer selected: " + stringComputerOption);
    client.sendMessage(message.from, "User selected: " + stringUserOption);
    client.sendMessage(message.from, "Please send 'paper', 'rock' or 'scissors' to play again.");
});

/**
 * Return the random string computer option
 * 
 * @returns {string}
 */
function getStringComputerOption() {
    const integerComputerOption = Math.floor(Math.random() * 3);
    const stringComputerOptions = ["paper", "rock", "scissors"];

    return stringComputerOptions[integerComputerOption];
}

client.initialize(); 