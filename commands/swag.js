module.exports = {
    name: 'swag',
    description: `Shows how swag you are right now, and has never lied, ever`,
    aliases: [`swagmeter`, `howswag`],
    execute(message, args) {
        console.log("Running: .swag")
        let swag = (Math.floor(Math.random()*101))
        if (!args.length) {
            message.channel.send(`${message.author} is ${swag}% swag.`)
            return
        }
        message.channel.send(`${message.mentions.users.first} is ${swag}% swag.`)
    }
}