const tools = require('./function');

const restify = require('restify');         // Needed to create server
const botbuilder = require('botbuilder');   // Needed to create bot

/**
 * Setup restify server
 * @type {*|Server}
 */
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3987, function () {
    console.log('%s bot started at %s', server.name, server.url)
});

/**
 * Create chat connector
 * @type {ChatConnector}
 */
const connector = new botbuilder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_SECRET
});

/**
 * Listening for user inputs
 */
server.post('/api/messages', connector.listen());
const helpMessage = '\n * I\'m Simon, I repeat everything you say. \n * I announce when an user comes or leaves the conversation. \n * The feature works with bots too.';
let savedAddress;

let username = '';

const bot = new botbuilder.UniversalBot(connector, session => {

    // Typing event
    // bot.on('typing', message => {
    //     session.send(message);
    //     return session.beginDialog('typingEventDialog', message);
    // });

    // Echo message received
    //session.beginDialog('echoDialog', session);

    // Launch waterfall tools
    //session.beginDialog('example', session);
    //session.beginDialog('reserveDialog', session);
    session.beginDialog('greetings:greetingsDialog', session);


});

bot.library(tools);