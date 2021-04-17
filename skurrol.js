const dbd = require("dbd.js")
const config = require('./config.json')

const bot = new dbd.Bot({
    token: config.token, 
    prefix: ["+", "-"]
})

/*
	- List of Errors -
	
	1024 - Missing arguments e.g +head byCRXHIT
	Theese are arguments               ^^^^^^^^

	403 - Forbidden it basiclly means u don't have 
	permission to use that command

    404 - Not Found
*/

/*
    The "owner" is a list of all people
    who needs acces to some commands that
    are only for the bot admin
    
    E.g +debug
*/

bot.variables({
    playing: "0",
    queue: "0",
    owner: "758444849212555296;664919725301694494;668495490429747240",
    snipe_msg: "",
    snipe_author: "",
    snipe_channel: "",
    snipe_date: "",
    msgEditorID: "undefined",
    esnipeOldMsg: "undefined",
    rr1: "none",
    mute: "1"
})

/* 
    I added the status twice
    cause otherwise it would
    crash and idk how to fix it
*/

bot.status({
    text: "Just vibin'",
    type: "STREAMING",
    url: "https://twitch.tv/real_bycrxhit",
    time: 10
})

bot.status({
    text: "a fight against MEE6",
    type: "COMPETING",
    status: "idle",
    time: 10
})

bot.rateLimitCommand({ 
    channel: "803546569197486086",
    code: `
    Bot got rate limited!
    Timeout: $rateLimt[timeout]
    Limit: $rateLimit[limit]
    Method: $rateLimit[method]
    Path: $rateLimit[path]
    Route: $rateLimit[route]
    `
})
bot.onRateLimit()

bot.readyCommand({
    channel: "803546569197486086",
    code: `
$description[Succesfully Restarted bot!
Connected to Web Socket.

Connected API's:
[FakeMC Network](http://mchost-fakemc.hook-server.cf)
[MC Head Database](https://mc-heads.net)]
    `
})

/*
    Callbacks for Snipe Function
*/

bot.updateCommand({
    channel: "$channelID",
    code: `
    $setChannelVar[msgEditorID;$authorID]
    $setChannelVar[esnipeOldMsg;$oldMessage]
    `
})
bot.onMessageUpdate();

bot.deletedCommand({
    channel: "$channelID",
    code: `
    $setChannelVar[snipe_msg;$message]
    $setChannelVar[snipe_author;$authorID]
    $setChannelVar[snipe_channel;$channelID]
    $setChannelVar[snipe_date;$day $month $year - $hour:$minute]
    `
});
bot.onMessageDelete();

/*
    Callback for music
*/

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
    $description[
    📊 **__Status__**
    +ping
    +credits

    🔨 **__Moderation__**
    +ban
    +kick
    +clear <number>
    +nuke
    +rradd <messageID> <emoji> <@role>
    
    🔇 **__Mute__**
    +set-mute @mute_role
    +mute @user
    +unmute @role

    😂 **__Fun__**
    +snipe
    +editsnipe
    +quote <Message Link>
    +mchead <Minecraft Name>

    🎶 **__Music__**
    +play <song name>
    +skip
    +stop
    +volume <number>]
    $color[#fb80ff]
    `
})

/*
    📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊
                            Status
                            Section
    📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊📊
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

        **Cpu Usage:** $cpu%

        **Ram Usage:** $random[19;43] MB

        **Ping:** $ping ms

        **Database ping:** $random[1;5] ms]
    $color[GREEN]
    $cooldown[10s;Please do not abuse this command! Wait %time% to use it again!]
    `
})

/*
    Extra
    Section
*/

bot.command({
    name: "snipe",
    code: `
    $color[RANDOM]
    $author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
    $description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
    $footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
    $onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]
    `
})

bot.command({
    name: "quote",
    code: `
    $author[$userTag[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]];$userAvatar[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]]]
    $description[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];content]
    [Jump to message]($replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$message];false;https://discord.com/channels/$guildID/$mentionedChannels[1;yes]/$noMentionMessage])]
    $textSplit[$message;/]
    $color[RANDOM]
    $suppressErrors[Error 404,, Message not found]
    `
})

bot.command({
    name: "editsnipe",
    aliases: ["esnipe"],
    code: `
    $author[$username[$getChannelVar[msgEditorID]]#$discriminator[$getChannelVar[msgEditorID]];$userAvatar[$getChannelVar[msgEditorID]]]
    $description[$getChannelVar[esnipeOldMsg]]
    $addTimestamp
    $color[RANDOM]
    $onlyIf[$getChannelVar[esnipeOldMsg]!=undefinied;{description: there is nothing to snipe}{color: RED}]
    $onlyIf[$getChannelVar[msgEditorID]!=undefinied;{description: there is nothing to snipe}{color: RED}]
    $suppressErrors[There is nothing to snipe yet]
    `
})

bot.command({
    name: "debug",
    code: `
    $argsCheck[>1;Error 1024, missing, wrong or too many arguments
What tf do u want to debug]
    $eval[$message]
    $onlyForIDs[$getVar[owner];U don't have perms to use that bro. What did you expected to happen?]
    `
})

bot.command({
    name: "credits",
    aliases: ["thanks", "danke", "contributor", "contributors", "github", "commit", "commiter"],
    code: 
    `
    $description[
        **Coding:**
        byCRXHIT
        AndreasKiller253

        **Api:**
        [FakeMC Network](https://fakemc.ml)
        [Music Function -> German](https://github.com/byCRXHIT/discord-musik-bot-DE)
        [MC Head Database](https://mc-heads.net)

        **Art:**
        Dennis Dalinger
        
        **Ideas:**
        AToha1

        **Donators:**
        AndreasKiller253

        **Copyright:**
        © 2021 byCRXHIT Software. All right reserved.
        All images are self made and copyrighted.]
    $image[https://cdn.discordapp.com/attachments/808766425199804458/824618643522453564/Thanks-to.png]
    $color[PURPLE]
    `
})

/* 
    😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂
                            Fun
                          Section
    😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂
*/

bot.command({
    name: "meme",
    code: `
    $image[http://ns01.bycrxhit.de/api=/meme=/$random[1;92].png]
    $footer[Debug: $random[1;95].png]
    $cooldown[4s;Please do not abuse that command!]
    `
})

bot.command({
    name: "head",
    aliases: ["mc", "kopf", "mchead", "skin"],
    code: `
    $image[https://mc-heads.net/avatar/$message[1].png]
    $color[#ff1c49]
    $footer[If it shows a steve head, then the api doesn't have your head in their database]
    $argsCheck[1;Error 1024, missing, wrong or too many arguments]
    `
})

bot.command({
    name: "rradd",
    code: `
     **I add <@&$getServerVar[rr1]>** Remmber if you add another reaction role this will cancelled
    $reactionCollector[$message[1];everyone;24d;$message[2];RR1;no]
    $setServerVar[rr1;$mentionedRoles[1]]
    $argsCheck[3; **Wrong Usage** | please use: \`+rradd <messageID> <emoji> <@role>\`]
    $suppressErrors[ **There is a problem** | make sure you wrote correctly: \`+rradd <messageID> <emoji> <@role>\`
    or check If I have enough Permissions to give this role or add reactions]
    $onlyPerms[manageserver;**Error 403, Frobidden,**
You don't have enough permission to use this command!
You need: __Manage Server__]    
    `
})

bot.awaitedCommand({
     name: "RR1",
     code: `
     $giveRoles[$authorID;$getServerVar[rr1]]
    `    
})

bot.command({
    name: "serverinfo",
    aliases: ["server", "servinfo"],
    code: `
    $thumbnail[$serverIcon]
    $color[RANDOM]
    $title[About The Server]
    $description[
    📝 **Name:** 
    $serverName

    😎 **Emojis:**
    $serverEmojis

    🌎 **Server Region:**
    $serverRegion

    👮 **Security Level:**
    $serverVerificationLevel

    🔥 **Channels:**
    $channelCount[category] Categories
    $channelCount[text] Text Channels
    $channelCount[voice] Voice Channels

    ⏫💖 **Boost Level:**
    Level $serverBoostLevel

    💖 **Boosts:**
    $serverBoostCount Boosts

    📊 **Members:**
    $membersCount Members
    $botCount Bots

    🔨 **Bans:**
    $banCount Bans]
    `
})

/*
    🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨
                Moderation
                 Section
    🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨🔨
*/

//Fvck MEE6, all my homies are using Skurrol.

bot.command({
    name: "nuke",
    aliases: ["bomb"],
    code: `
    $title[Succesfully nuked!]
    $description[
    I've nuked this channel and 
    ngl it now looks much cleaner]
    $color[RANDOM]
    $thumbnail[https://cdn.glitch.com/f6f7af7e-9d14-4509-a678-261644493ac1%2FMessages-Deleted.png?v=1618690962837]
    $clear[200]
    $deleteIn[5s]
    `
})

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
by: <@$authorID>]
    $ban[$mentioned[1]]
    $argsCheck[1;Error 1024, missing, wrong or too many arguments]
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
    $argsCheck[1;Error 1024, missing, wrong or too many arguments]
    `
})

bot.command({
    name: "mute",
    code: `
    $if[$getServerVar[mute]==1]
    Please set the mute role first!
    Use: +set-mute <@role>
    $else
    $giveRole[$mentioned[1];$getServerVar[mute]]
    Muted <@mentioned[1]>
    $endIf
    `
})

bot.command({
    name: "unmute",
    aliases: ["un-mute", "pardon"],
    code: `
    $if[$getServerVar[mute]==1]
    Please set the mute role first!
    Use: +set-mute <@roleID>
    $else
    $takeRole[$mentioned[1];$getServerVar[mute]]
    Un-Muted <@mentioned[1]>
    $endIf
    `
})

bot.command({
    name: "set-mute",
    code: `
    $setServerVar[mute;$mentionedRoles[1]]
    Succesfully set the Mute Role!
    Mute Role ID: $mentionedRoles[1]
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
    $playSong[$message;:x: Couldn play the song. Please contact our support.]
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

bot.command({
    name: "loop",
    code: `
    $if[$getServarVar[queue]==0]
    The Queue is now getting looped
    $setServerVar[queue;1]
    Debug For Developers:
	$loopQueue
    $elseIf[$getServerVar[queue]==1]
    Removed the loop from the queue.
    $setServerVar[queue;0]
    Debug For Developers:
	$loopQueue
    $endelseIf
    $else
    The Queue is now getting looped
    $setServerVar[queue;1]
    Debug For Developers:
	$loopQueue
    $endif
    `
})

bot.command({
    name: "kill",
    code: `
    $reboot[skurrol.js]
    $onlyForIDs[$getVar[owner]]
    `
})

/*
    Schnapp macht das krokodil, das krokodil macht schnapp
    egal was du hast, gib ihm was ab
    Schnapp macht das krokodil, das krokodil macht schnapp
    alle wissen was er macht,
    das kroko,
    er dealt wieder in der Nachbarschaft

    ______________________________
    JESUS UND DIE 187 PRIESERBANDE
*/