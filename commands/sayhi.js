const hello = ['hello', 'ello ello ello', 'guten tag', 'Hello, World', 'Hallo', 'hello!', 'Hello']

module.exports = {
    name: 'sayhi',
    description: "A warm greeting.",
    execute(message, args) {
        console.log("Running: .sayhi")
        message.channel.send(hello[Math.round(Math.random()*(hello.length-1))])
    }
}