const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const Spotify = require("spotify-api.js")
const sFetch = require("node-superfetch")



module.exports = {
    data : new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("Playlist utilizada nas lives"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        const url = "https://api.spotify.com/v1/playlists/5KCzChPgw0b2MlsyCuNtW0?market=BR";
        var options = {headers: {Authorization: "Bearer " + client.spotifyClient.token}};
        var playlist = await fetch(url, options).then( res => res.json() ).then( data => {return data} );
        var imagem = playlist.images[0].url

        const embed = new EmbedBuilder()
        .setTitle("Playlist no Spotify")
        .setThumbnail("https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png")
        .setURL("https://open.spotify.com/playlist/5KCzChPgw0b2MlsyCuNtW0?si=7c91f13fd1d14a20")
        .addFields(
            { name: `Playlist : ${playlist.name }`, value: '\u200B'},
            { name: `Total de Faixas : ${playlist.tracks.total}`, value:'\u200B' },
        )
        .setImage(
            `${imagem}`
        )
        .setFooter({ text: `${playlist.followers.total} Followers`, iconURL: 'https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png' });
        
        interaction.reply({embeds : [embed],content : ""})
    }
}
