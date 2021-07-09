const bananaID = require('../config.json')

module.exports = {
    name: 'swag',
    description: `Shows how swag you are right now, and has never lied, ever`,
    aliases: [`swagmeter`, `howswag`],
    execute(message, args) {
        console.log("Running: .swag")
        let swag = (Math.floor(Math.random()*101))

        /* If no arguments */
        if (!args.length) {
            message.channel.send(`${message.author} is ${swag}% swag.`)
            return
        }
        const taggedUser = message.mentions.users.first();

        /* Return if args is not a user to prevent runtime error */
        if (taggedUser == undefined) {
            message.channel.send(`Please specify a user, or input no arguments to evaluate yourself.`)
            return
        }

        if (taggedUser.id == bananaID.id)
            message.channel.send(`${taggedUser} is 100% swag.`)
        else message.channel.send(`${taggedUser} is ${swag}% swag.`)
    }
}