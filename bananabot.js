/* bot setup */
const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = '.'
const config = require('./config.json')

/* command setup */
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
client.commands = new Discord.Collection()
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

/* log to console when activated */
client.once('ready', () => {
    console.log('It\'s banana time.')
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'help'){
        client.commands.get('help').execute(message, args)
    }
    else if (command === 'sayhi') {
        client.commands.get('sayhi').execute(message, args)
    }
})

client.login(config.token)