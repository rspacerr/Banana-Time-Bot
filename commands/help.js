module.exports = {
    name: `help`,
    description: `The command you just used`,
    execute(message, args) {
        const data = []
        const { commands } = message.client

        /* If no argument specified */
        if (!args.length) {
            console.log("Running: .help")
            data.push('Bot Commands:')
            data.push(commands.map(command => `**` + command.name + `:** ` + command.description).join('\n'))
            data.push(`\nUse .help [command name] for help on a specific command`)
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.channel.send(`DM Sent!`)
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
                    message.reply(`Error encountered - Couldn't DM you`)
                })
        }

        /* Give description of specified command */
        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(c => aliases && c.aliases.includes(name))

        if (!command) { 
            message.channel.send("That's not a valid command, try again")
            return
        }

        if (command.description) data.push(`**${command.name}** - ${command.description}`)
        else message.channel.send(`Hmm...no description found. You should probably report that to r rr.`)

        message.channel.send(data, { split: true })
    }
}