const {LoadCommands} = require("../../handlers/comandhandler")
const fetch = require("node-superfetch")
const {EmbedBuilder, CommandInteractionOptionResolver} = require("discord.js")
var flag = 0
var mensagem



module.exports = {
    name : "ready",
    once : true,
    async execute(client){
        console.log(client.user.tag + " Está Logado")
        await LoadCommands(client)
        setInterval(async() => {await CheckStream(client)}, 10000)
    }

}

async function CheckStream(client){
    let user = "s_schneider"
    const status = await fetch.get(`https://decapi.me/twitch/uptime/${user}`)
    if(status.body != "s_schneider is offline"){
        const uptime = await fetch.get(`https://decapi.me/twitch/uptime/${user}`)
        const title = await fetch.get(`https://decapi.me/twitch/title/${user}`)
        const game = await fetch.get(`https://decapi.me/twitch/game/${user}`)
        const logoCanal = await fetch.get(`https://decapi.me/twitch/avatar/${user}`)


        const embed = new EmbedBuilder()
        .setTitle("LIVE ON MEUS QUERIDOS")
        .setDescription(`${title.body} \n Jogando ${game.body}`)
        .setURL("https://twitch.tv/s_schneider")
        .setImage(`${logoCanal.text}`)
        if (flag!=0){
            //client.channels.cache.get("549739489514487818").messages.fetch(mensagem.id).then((msg) => msg.edit({embeds : [embed]}))
        }
        else{
            mensagem = await client.channels.cache.get("549739489514487818").send({embeds : [embed], content : "@everyone"})
            flag = 1
        } 
    }
    else{
        if(flag != 0){
            const embed = new EmbedBuilder()
            .setTitle("STREAM OFFLINE")
            .setDescription(`Mas não fique triste, logo logo tem mais!`)
            .setURL("https://twitch.tv/s_schneider")
            client.channels.cache.get("549739489514487818").messages.fetch(mensagem.id).then((msg) => msg.edit({embeds : [embed], content : ""}))
            flag = 0
        }
    }
}