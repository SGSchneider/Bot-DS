const {ChatInputCommandInteraction, SlashCommandBuilder} = require("discord.js")


module.exports = {
    data : new SlashCommandBuilder()
    .setName("teste")
    .setDescription("Nhaa"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        interaction.reply({content : "Comando de Teste, obrigado por usar!"})
    }
}