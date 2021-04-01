const dbd = require("dbd.js")
const config = require('./config.json')

const bot = new dbd.Bot({
    token: config.token, 
    prefix: ["+", "-"]
})

bot.variables({
    owner: "758444849212555296;664919725301694494"
})

bot.status({
    text: "Just vibin'",
    type: "STREAMING",
    url: "https://twitch.tv/real_bycrxhit",
    time: 30
})

bot.status({
    text: "Just vibin'", 
    type: "STREAMING", 
    url: "https://twitch.tv/real_bycrxhit",
    time: 30
})

bot.musicEndCommand({
    channel: "$channelID",
    code: `
    $title[Stopped Song]
    $description[Nothing to play in the queue anymore. Leaving voice channel.]
    $color[RED]
    `
})

bot.musicStartCommand({
    channel: "$channelID",
    code: `
    $title[Playing Song]
    $description[Playing: **$songInfo[title]**
Lenght: **$songInfo[duration] Minutes**
Uploaded by: **$songInfo[publisher]**]
    $color[GREEN]
    $thumbnail[$songInfo[thumbnail]]
    `
})

bot.onMessage()

bot.command({
    name: "help",
    aliases: ["hel", "h", "holp", "he", "hep", "hilfe"],
    code: `
    $description[📊 **__Status__**
    +ping
    +credits
    🔨 **__Moderation__**
    +ban
    +kick
    +clear <number>
    😂 **__Fun__**
    +mchead <Minecraft Name>]
    $footer[$randomText[; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ; ;☭ SOVIET UNION]]
    $image[https://cdn.discordapp.com/attachments/808766425199804458/821774775520460820/img_help.png]
    $color[#fb80ff]
    `
})

/*
    Status
    Section
*/

bot.command({
    name: "ping",
    code: `
    $replaceText[$djsEval[const {MessageEmbed} = require('discord.js')
    if ($ping > 300) {
    const pingA = new MessageEmbed() 
    .setTitle('Pong! | 🏓')
    .setDescription("$ping ms | 🔴")
    .setColor("RED")
    .setTimestamp()
    d.message.channel.send(pingA)
    } else if ($ping > 200) {
    const pingMO = new MessageEmbed() 
    .setTitle('Pong! | 🏓')
    .setDescription("$ping ms | 🟡")
    .setColor("YELLOW")
    .setTimestamp()
    d.message.channel.send(pingMO)
    } else if ($ping < 200) {
    const pingM = new MessageEmbed() 
    .setTitle('Pong! | 🏓')
    .setDescription("$ping ms | 🟢")
    .setColor("GREEN")
    .setTimestamp()
    d.message.channel.send(pingM)
    } else {
    const pingN = new MessageEmbed() 
    .setTitle('Pong! | 🏓')
    .setDescription("⚪ | $ping ms")
    .setColor("#fefefe")
    .setTimestamp()
    d.message.channel.send(pingN)
    }
    ];Promise { <pending> };]
   
    $cooldown[3s;You're on cooldown! Please wait %time%.]
    $suppressErrors[{color:FF0000}{title:Something went wrong...}{description:If you see this, something probably went wrong. Please immediately report this to the 
   developer!}]
   `
})

bot.command({
    name: "status",
    aliases: ["info", "i", "stats", "stat"],
    code: `$description[
        **Uptime:** $uptime
        **Cpu Usage:** $random[1.01;10.99]%
        **Ram Usage:** $random[19;43] MB
        **Ping:** $ping ms
        **Database ping:** $random[0;5] ms
    ]
    $color[$randomText[GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;GREEN;ORANGE;ORANGE;ORANGE;ORANGE;ORANGE;ORANGE;RED;RED;RED;RED;RED;RED;RED;RED;RED;RED;RED;RED;RED]]
    $cooldown[10s;Please do not abuse this command! Wait %time% to use it again!]
    `
})

/*
    Extra
    Section
*/

bot.command({
    name: "debug",
    code: `
    $argsCheck[>1;What tf do u want to debug]
    $eval[$message]
    $onlyForIDs[$getVar[owner];U don't have perms to use that bro. What did you expected to happen?]
    `
})

bot.command({
    name: "credits",
    aliases: ["thanks", "danke"],
    code: 
    `
    $description[
        **Coding:**
        byCRXHIT
        AndreasKiller253
        FOX
        NoZe
        **Api:**
        [FakeMC Network\\](https://fakemc.ml)
        [Music Function -> German](https://github.com/byCRXHIT/discord-musik-bot-DE)

        **Art:**
        Dennis Dalinger
        
        **Ideas:**
        AToha1

        **Donators:**
        AndreasKiller253

        **Copyright:**
        © 2021 byCRXHIT Software. All right reserved.
        All images are self made and copyrighted.
    ]
    $image[https://cdn.discordapp.com/attachments/808766425199804458/824618643522453564/Thanks-to.png]
    $color[PURPLE]
    `
})

/* 
    Fun
    Section
*/

bot.command({
    name: "meme",
    code: `
    $image[http://mchost-fakemc.hook-server.cf/api=/meme=/$random[1;92].png]
    $footer[Debug: $random[1;92].png]
    $cooldown[4s;Please do not abuse the bot!]
    `
})

bot.command({
    name: "head",
    aliases: ["mc", "kopf", "mchead", "skin"],
    code: `
    $image[https://mc-heads.net/avatar/$message[1]]
    $color[#ff1c49]
    $footer[If it shows a steve head, then the api doesn't have your head in their database]
    $argsCheck[1;Usage: +head <Minecraft Name>]
    `
})

/*
    Moderation
    Section
*/

bot.command({
    name: "clear",
    code: `
    $title[$message[1] messages were deleted.]
    $footer[Deleted by: $username]
    $color[PURPLE]
    $deleteIn[5s]
    $image[https://media.discordapp.net/attachments/808766425199804458/824606185889071124/Messages-Deleted.png]
    $clear[$message[1]]
    $argsCheck[1;Error 1024, missing, wrong or too many arguments]
    `
})

bot.command({
    name: "ban",
    aliases: ["bann"],
    code: `
    $title[User Banned]
    $description[The User <@$mentioned[1]> got banned
by: <@$authorID>]b
    $ban[$mentioned[1]]
    `
})

bot.command({
    name: "kick",
    code: `
    $kick[$mentioned[1]]
    $title[User Kicked]
    $color[YELLOW]
    $description[The User <@$mentioned[1]> got kicked
by <@$authorID>]
    `
})

/*
    Music
    Section
*/

bot.command({
    name: "play",
	aliases: ["p"],
    code: `
    $playSong[$message;:x: Couldn play song. Please contact our support.]
	$argsCheck[>1;Usage: +play <song name>]
    `
})

bot.command({
    name:"skip",
	aliases: ["s", "sk"],
    code:`
    $skipSong
    `
})

bot.command({
    name: "stop",
    code: `
    $title[Stopped Song!]
    $description[Song: $songInfo[title]]
    $color[RED]
    $stopSong
    `
})

bot.command({
	name: "volume",
	aliases: ["v"],
	code: `
    $if[$message>100]
	The volume can't be over 100%!
	$elseIf[$message<1]
	The Volume can't be lower than 0%!
	$endelseIf
	$else
	Set the volume to $message[1]%.
	$volume[$message]
	$endif
	$argsCheck[1;Usage: +volume <nummer>]
    `
})

/*
     Andreas is gea *JOKE*
     HMmmMmMmm Should i add NoobLink in here? 
*/
