var restify = require('restify')
var botbuilder = require('botbuilder')

// setup the restify server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3987, function(){
	console.log('%s bot started at %s', server.name, server.url);
})

// create chat connector
var connector = new botbuilder.ChatConnector({
	appId: process.env.APP_ID,
	appPassword: process.env.APP_SECRET
})

// Listening for user inputs
server.post('/api/messages', connector.listen())

// Reply by echoing
var bot = new botbuilder.UniversalBot(connector, function(session){
	session.send(`${session.message.text} | [length: ${session.message.text.length}]`)
	//session.send(`type: ${session.message.type}`)
	bot.on('conversationUpdate', function(message){
	//console.log(JSON.stringify(message.))
	//session.send(`${JSON.stringify(message.membersAdded)}`)
		if (message.membersAdded && message.membersAdded.length > 0) {
			var membersAdded = message.membersAdded
			.map(function(x){
				var isSelf = x.id === message.address.bot.id
				return (isSelf ? message.address.bot.name : x.name) || ' ' + '(Id = ' + x.id + ')'
			}).join(', ')
			bot.send(new botbuilder.Message()
				.address(message.address)
			.text('Welcome ' + membersAdded))

		}
    if(message.membersRemoved && message.membersRemoved.length > 0){
      var membersRemoved = message.membersRemoved
      bot.send(new botbuilder.Message()
        .address(message.address)
      .text('A user has left the conversation'))
    }
	})

  bot.on('contactRelationUpdate', function(message){
    console.log(JSON.stringify
      (message))
    if(message.action == "add"){
      bot.send(new botbuilder.Message()
        .address(message.address)
      .text('Welcome bot ' + message.id))
    }
    else{
      bot.send(new botbuilder.Message()
        .address(message.address)
      .text('A bot has left the conversation'))

    }
  })


	bot.on('typing', function(){
		session.send('having some thinking trouble ?')
	})
	/*session.send(`${JSON.stringify(session.dialogData)}`)
	session.send(`${JSON.stringify(session.sessionState)}`)
	session.send(`${JSON.stringify(session.conversationData)}`)
	session.send(`${JSON.stringify(session.userData)}`)*/
})




/*

test
User à 20:17:44

Écrivez votre message...
Details{
  "type": "contactRelationUpdate",
  "action": "add",
  "id": "an5dkie94dg7",
  "channelId": "emulator",
  "timestamp": "2017-09-12T18:17:51.292Z",
  "localTimestamp": "2017-09-12T20:17:51+02:00",
  "recipient": {
    "id": "jhnj9lb8lgma",
    "name": "Bot"
  },
  "conversation": {
    "id": "lch0li02bd3e"
  },
  "from": {
    "id": "default-user",
    "name": "User"
  },
  "serviceUrl": "http://localhost:33405"
}

*/

/*

test
User à 20:17:44

Écrivez votre message...
Details{
  "type": "conversationUpdate",
  "membersAdded": [
    {
      "id": "jhnj9lb8lgma",
      "name": "Bot"
    }
  ],
  "id": "0719a8jn65jja",
  "channelId": "emulator",
  "timestamp": "2017-09-12T18:17:02.517Z",
  "localTimestamp": "2017-09-12T20:17:02+02:00",
  "recipient": {
    "id": "jhnj9lb8lgma",
    "name": "Bot"
  },
  "conversation": {
    "id": "cfgfdk2757f5"
  },
  "from": {
    "id": "default-user",
    "name": "User"
  },
  "serviceUrl": "http://localhost:33405"
}

*/