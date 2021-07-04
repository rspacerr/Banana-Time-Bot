module.exports = {
    name: 'help',
    description: "List of commands.",
    execute(message, args) {
        const data = []
        const { commands } = message.client

        if (!args.length) {
            console.log("Running: .help")
            data.push('Here\'s a list of all the commands:')
            data.push(commands.map(command => command.name).join(', '))
            data.push(`\nUse .help [command name] for help on a specific command`)
            message.channel.send("```Test```")  
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.channel.send("DM Sent!")
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
                    message.reply(`Error encountered - Couldn't DM you`)
                })
        }

        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => aliases && c.aliases.includes(name))

        if (!command) { 
            message.channel.send("That's not a valid command, try again")
            return
        }
        data.push(`**${command.name}**`)
        if (command.description) data.push(`${command.description}`)
        else message.channel.send(`Hmm...no description found. You should probably report that to r rr.`)

        message.channel.send(data, { split: true })
    }
}