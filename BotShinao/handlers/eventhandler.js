async function LoadEvents(client){
    const {LoadFiles} = require("../functions/fileloader")
    await client.events.clear()
    const Files = await LoadFiles("events")
    var count = 0
    Files.forEach((file) => {
        const event = require(file)
        const execute = (...args)=>event.execute(...args,client)

        if(event.rest){
            if(event.once) client.rest.on(event.name, execute)
            else client.rest.on(event.name, execute)
        }
        else{
            if(event.once) client.once(event.name, execute)
            else client.on(event.name, execute)
        }

        count++
    })
    console.log(count + " Files Loaded")
    return 
}

module.exports = {LoadEvents}