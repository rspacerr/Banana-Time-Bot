/* Bot setup */
const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = '.'
const config = require('./config.json')

/* Command setup */
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
client.commands = new Discord.Collection()
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

/* Command handling */
client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
    command.execute(message, args)
})

/* Event handling */
const eventFiles = fs.readdirSync(`./events`).filter(file => file.endsWith(`.js`))
for (const file of eventFiles) {
	const event = require(`./events/${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client))
	} else {
		client.on(event.name, (...args) => event.execute(...arg, client))
	}
}

client.login(config.token)