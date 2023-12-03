const {ChatInputCommandInteraction} = require("discord.js")

module.exports = {
    name : "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        if(!interaction.isChatInputCommand())return 

        const command = client.commands.get(interaction.commandName)
        
        command.execute(interaction,client)
    }
}