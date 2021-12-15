const ytdl = require(`ytdl-core`)
const ytSearch = require(`yt-search`)

const queue = new Map()

module.exports = {
    name: `play`,
    aliases: ['p', `skip`, `stop`],
    cooldown: 0,
    description: `Rhythm 2`,
    async execute(message, args, cmd, client, Discord) {
        console.log("Running: .play")

        /* Check if user is in vc */
        const voice_channel = message.member.voice.channel
        if (!voice_channel)
            return message.channel.send(`You need to be in a voice channel to run this command!`)

        /* Check permissions to join vc */
        const permissions = voice_channel.permissionsFor(message.client.user)
        if (!permissions.has(`CONNECT`)) return message.channel.send(`I don't have permission to join that channel!`)
        
        const server_queue = queue.get(message.guild.id)

        /* Playing Songs */
        if (cmd === `play` || cmd === `p`) {
            if (!args.length)
                return message.channel.send(`please attach a song`)
            let song = {}

            /* If given direct URL */
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0])
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                const video_finder = async(query) => {
                    const videoResult = await ytSearch(query)
                    return (videoResult.Result.videos.length > 1) ? videoResult.videos[0] : null
                }

                const video = await video_finger(args.join(` `))
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send(`Can't find ${query}, sorry.`)
                }
            }

            /* Make queue if no queue */
            if (!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queue_constructor)
                queue_constructor.songs.push(song)

                try {
                    const connection = await voice_channel.join()
                    queue_constructor.connection = connection
                    video_player(message.guild, queue_constructor.songs[0])
                } catch (err) {
                    queue.delete(message.guild.id)
                    message.channel.send(`Whoops! We had an oopsie daisie connecting!`)
                    throw err
                } 

            /* Add songs */
            } else {
                server_queue.songs.push(song)
                return message.channel.send(`**${song.title}** added to the queue of ${server_queue.length} songs.`)
            }
        }

        else if (cmd === `skip`) skip_song(message, server_queue)
        else if (cmd === `stop`) stop_song(message, server_queue)
    }
}

const video_player = async(guild, song) => {
    const song_queue = queue.get(guild.id)

    if (!song) {
        song_queue.voice_channel.leave()
        queue.delete(guild.id)
        return
    }
    const stream = ytdl(song.url, { filter: `audioonly` })
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on(`finish`, () => {
        song_queue.songs.shift()
        video_player(guild, song_queue.songs[0])
    })
    await song_queue.text_channel.send(`:musical_note: Now Playing: **${song.title}** :musical_note:`)
}

/* Skip if in vc and queue exists */
const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) 
        return message.channel.send(`Join a channel before disrupting listeners, at least.`)
    if (!server_queue)
        return message.channel.send(`There are no songs in queue pepeHands`)

    server_queue.connection.dispatcher.end()
}

/* Stop the Song */
const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) 
        return message.channel.send(`Join a channel before disrupting listeners, at least.`)
    server_queue.songs = []
    server_queue.connection.dispatcher.end()
}