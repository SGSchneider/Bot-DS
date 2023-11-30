async function LoadCommands(client){
    const {LoadFiles} = require("../functions/fileloader")

    await client.commands.clear()

    let commandsArray = []
    const Files = await LoadFiles("commands")

    var count = 0

    Files.forEach((file) => {
        const command = require(file)
        client.commands.set(command.data.name,command)

        commandsArray.push(command.data.toJSON())

        count++
    })

    client.application.commands.set(commandsArray)

    return console.log(count + " Comands Loaded")
}

module.exports = {LoadCommands}