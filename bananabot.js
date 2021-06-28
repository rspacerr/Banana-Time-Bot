const Discord = require('discord.js')
const client = new Discord.Client()

const prefix = '.'
const config = require('./config.json')
const hello = ['hello', 'ello ello ello', 'guten tag', 'Hello, World', 'Hallo', 'hello!', 'Hello']

client.once('ready', () => {
    console.log('It\'s banana time.')
})

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'sayhi'){
        console.log("Running: .sayhi")
        message.channel.send(hello[Math.round(Math.random()*hello.length)])
    }
})

client.login(config.token)