const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require("discord.js")
const gapi = require("googleapis")
const sFetch = require("node-superfetch")



module.exports = {
    data : new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Informações sobre o canal do youtube"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        await interaction.reply({content: "Loading..."})
        const url = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${client.config.youtube_channel_id}&key=${client.config.youtube_token}`;

        const file_img = new AttachmentBuilder('assets/s_schneider.png');
        const file_logo = new AttachmentBuilder('assets/yt_logo_rgb_dark.png');
        var options = {headers: {Accept: "application/json"}};
        var canal = await fetch(url, options).then( res => res.json() ).then( data => {return data} )
        var data
        canal.items.map((s)=>{data = s})
        var imagem
        var logo
        try{
            imagem = 'attachment://s_schneider.png'
            logo = 'attachment://yt_logo_rgb_dark.png'
        }catch(err){
            console.log(err)
        }
        
        
        try{
            const embed = new EmbedBuilder()
            .setTitle("Canal no Youtube")
            .setThumbnail(logo)
            .setURL("https://www.youtube.com/@SSchneider")
            .addFields(
                { name: `Canal : S_Schneider`, value: '\u200B'},
                { name: `Total de Vídeos : ${data.statistics.videoCount}`, value:'\u200B' },
            )
            .setImage(
                `${imagem}`
            )
            .setFooter({ text: `${data.statistics.subscriberCount} Followers`, iconURL: 'https://www.freepnglogos.com/uploads/youtube-play-red-logo-png-transparent-background-6.png' });
            
            interaction.editReply({embeds : [embed],content : "", files: [file_img,file_logo]})
        }catch(err){
            console.log(err)
            interaction.editReply({content : "Ocorreu um erro, por favor tente novamente em alguns instantes."})
            
        }
    }
}
