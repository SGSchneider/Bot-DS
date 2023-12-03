const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js")
const {User, Message, GuildMember, ThreadMember} = Partials
const client = new Client({
    intents : 3276799,
    partials : [User, Message, GuildMember, ThreadMember]
})




client.config = require("./config.json")
client.commands = new Collection()
client.events = new Collection()




const {LoadEvents} = require("./handlers/eventhandler")
LoadEvents(client)

client.login(client.config.token)