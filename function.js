const botbuilder = require('botbuilder');

const tools = new botbuilder.Library('greetings');

tools.dialog('greetingsDialog', [

    (session) => {
    session.beginDialog('askName')
},
(session, results) => {
    session.endDialog('Hello %s!', results.response)
}

]);

// Dialog ask name
tools.dialog('askName', [
    (session) => {
    botbuilder.Prompts.text(session, 'What\'s your name ?')
},
(session, results) => {
    session.endDialogWithResult(results)
}
]);

module.exports = tools;