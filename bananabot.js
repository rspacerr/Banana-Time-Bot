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
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
    command.execute(message, args)
})

client.login(config.token)