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
        const taggedUser = message.mentions.users.first();
        message.channel.send(`${taggedUser} is ${swag}% swag.`)
    }
}