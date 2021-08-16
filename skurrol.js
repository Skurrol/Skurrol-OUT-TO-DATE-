const Aoijs = require("aoi.js")
const config = require('./config.json')

const bot = new Aoijs.Bot({
    token: config.token, 
    prefix: ["?", "!"]
})

//JOIN THE DISCORD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//https://skurrol.tk/invite!=discord

bot.variables({
    playing: "0",
    prefix: "+",
    queue: "0",
	//Put here a list of UserIDs, between every userid put a ;
    owner: "",
    snipe_msg: "",
    snipe_author: "",
    snipe_channel: "",
    snipe_date: "",
    msgEditorID: "undefined",
    esnipeOldMsg: "undefined",
//Put in here a ChannelID of where the bot should log things
    logChannel: "",
    mute: "1",
	//Put your api key in here of apivoid.com
    apikeys: ""
})

bot.status({
    text: "Just vibin'",
    type: "STREAMING",
    url: "https://twitch.tv/real_bycrxhit",
    time: 10
})

bot.status({
    text: "against MEE6",
    type: "COMPETING",
    status: "idle",
    time: 10
})

bot.rateLimitCommand({ 
    channel: "$getVar[logChannel]",
    code: `
> **IMPORTANT**
Abuse Detected!

    Timeout: $rateLimt[timeout]
    Limit: $rateLimit[limit]
    Method: $rateLimit[method]
    Path: $rateLimit[path]
    Route: $rateLimit[route]
    `
})
bot.onRateLimit()

bot.readyCommand({
    channel: "$getVar[logChannel]",
    code: `
$description[Succesfully Restarted bot!
Connected to Web Socket.

Connected API's:
[FakeMC Network](http://fakemc.ml)
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
bot.onMessageDelete()

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
    name: "sus",
	aliases: ["amogus", "amongus"],
    code: `
    **AMOGUS**
	`
})

bot.command({
    name: "help",
    aliases: ["hel", "h", "holp", "he", "hep", "hilfe"],
    code: `
    $description[
📊 **__Status__**
+ping
+credits
+status

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
+roulette
+snipe
+emoji
+howgay
+howsimp
+editsnipe
+amogus
+quote <Message Link>
+mchead <Minecraft Name>
+fox
+cat
+panda
+base64 <message>
+hug @user
+wasted @user
+comment
+pokedex <pokemon>
+hack @user

🎶 **__Music__**
+play <song name>
+skip
+stop
+volume <number>
+mp3 <youtube.com/watch?v=VideoID>
+mp4 <youtube.com/watch?v=VideoID>]
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
    $suppressErrors[Error 404, Message not found]
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
    name: "howgay",
    aliases: ["gay", "gae", "gayhow", "howgae"],
    code: `
    $title[How gay are you?]
    $description[You are $random[0;101]%  🏳️‍🌈]
    $footer[Imagine making jokes about it in 2021]
    $color[RANDOM]
    `
})

bot.command({
    name: "howsimp",
    aliases: ["simp"],
    code: `
    $title[How simp are you?]
    $description[You are $random[0;101]% a simp~]
    $footer[Silence wench]
    $color[RANDOM]
    `
})

bot.command({
    name: "dice",
    aliases: ["random", "roll", "cube", "rubik", "coob"],
    code: `
    $title[Roll The Dice 🎲]
    $description[I've rolled the dice... I got: $random[1;6] 🎲]
    $color[WHITE]
    `
})

bot.command({
    name: "roulette",
    aliases: ["russian", "russian-roulette", "rou"],
    code: `
    $title[Russian Roulette? Ok.]
    $description[You've hit the: $random[1;9] bullet. You $randomText[survived it :);survived it :);survived it :);survived it :);survived it :);survived it :);didn't survived it :(;didn't survived it :(;didn't survived it :(;didn't survived it :(;didn't survived it :(]]
    $color[RED]
    `
})

bot.command({
    name: "emoji",
    code: `
    $randomText[😀;😃;😄;😁;😆;😅;🤣;😂;🙂;🙃;😉;😊;😇;🥰;😍;🤩;😘;😗;☺️;😚;😙;🥲;😋;😛;😜;🤪;😝;🤑;🤗;🤭;🤫;🤔;🤐;🤨;😐;😑;😶;😏;😒;🙄;😬;🤥;😌;😔;😪;🤤;😴;😷;🤒;🤕;🤢;🤮;🤧;🥶;🥴;😵;🤯;🤠;🥳;😎;🤓;🧐;😕;😟;🙁;☹️;😮;😯;😲;😳;🥺;😦;😧;😨;😰;😥;😭;😱;😖;😣;😞;😓;😩;😫;🥱;😤;😠;🤬;😈;💀;☠️;💩;🤡;👹;👺;👻;👽;👾;🤖;😺;😿;👋;🤚;🖐️;✋;🖖;👌;👍;👎;👊;🤛;🤜;👏;🙌;👐;🤲;🤝;🙏;✍️;💅;🤳;💪;🧠;🦷;🦴;👀;👁️;👶;🧒;👦;👧;🧑‍;🗣️;👤;👥;👣;🧳;🌂;☂️;🎃;🧵;🧶;🧥;🧦;👗;👘;🥻;🩱;🩲;🩳;👙;👚;👛;👜;👝;🎒;👒;🎩;🎓;💄;💍;💼;🩸]
    `
})

//  https://cdn.discordapp.com/attachments/790891906569076736/833787326982651914/video0-204.mp4

bot.command({
    name: "meme",
    code: `
    $image[http://ns01.bycrxhit.de/api=/meme=/$random[1;186].png]
    $footer[Debug: $random[1;186].png]
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


//Banned AndreasKiller253 cause abusing it...
bot.command({
    name: "clear",
    code: `
    $if[$authorID==664919725301694494]
    You are banned from using this command!
    $else
    $title[$message[1] messages were deleted.]
    $footer[Deleted by: $username]
    $color[PURPLE]
    $deleteIn[5s]
    $image[https://media.discordapp.net/attachments/808766425199804458/824606185889071124/Messages-Deleted.png]
    $clear[$message[1]]
    $argsCheck[1;Error 1024, missing, wrong or too many arguments]
    $endIf
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
    $title[Successfully Muted]
    $description[Muted <@$mentioned[1]>]
    $color[RED]
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
    $title[Successfully unmuted]
    $description[Un-Muted <@$mentioned[1]>]
    $color[GREEN]
    $endIf
    `
})

bot.command({
    name: "set-mute",
    code: `
    $setServerVar[mute;$mentionedRoles[1]]
    $title[Mute-role set!]
    $description[Succesfully set the Mute Role!
    Mute Role: <@&$mentionedRoles[1]>]
    $color[GREEN]
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
  name: "mp3",
  code: `$description[**[Generated Link](https://www.yt-download.org/api/widget/mp3/$replaceText[$message[1];https://www.youtube.com/watch?v=;])**]
  $image[https://i.ytimg.com/vi/$replaceText[$message[1];https://www.youtube.com/watch?v=;]/mqdefault.jpg]
  $color[RED]
  $argsCheck[1;Example a=mp3 \`https://youtube.com/watch?v=VideoID\`]`
})

bot.command({
  name: "mp4",
  code: `$description[**[Generated Link](https://www.yt-download.org/api/widget/videos/$replaceText[$message[1];https://www.youtube.com/watch?v=;])**]
    $image[https://i.ytimg.com/vi/$replaceText[$message[1];https://www.youtube.com/watch?v=;]/mqdefault.jpg]
    $color[RED]
    $argsCheck[1;Example a=mp4 \`https://youtube.com/watch?v=VideoID\`]`
})

bot.command({
    name: "fox",
    aliases: ["foxy", "foxfox", "fux", "foxs"],
    code: `
	    $title[$randomText[uwu :3;Uwu :3;uwU :3;uWu :3;UwU :3;UWU :3;uWu :3;uwu;Uwu;uwU;uWu;UWU]]
      $image[$jsonRequest[https://randomfox.ca/floof/;image;Could not load a fox image! ( API Down or another ban :/ )]]
	    $cooldown[10s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
      $color[RANDOM]
    `
})

bot.command({
    name: "cat",
    aliases: ["cats", "uwu", "catcat"],
    code: `
	$title[$randomText[uwu :3;Uwu :3;uwU :3;uWu :3;UwU :3;UWU :3;uWu :3;uwu;Uwu;uwU;uWu;UWU]]
    $image[$jsonRequest[https://some-random-api.ml/img/cat;link;Could not load a cat image! ( API Down or another ban :/ )]]
	$cooldown[10s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
    $color[RANDOM]
    `
})

bot.command({
    name: "panda",
    aliases: ["pandas"],
    code: `
	$title[$randomText[uwu :3;Uwu :3;uwU :3;uWu :3;UwU :3;UWU :3;uWu :3;uwu;Uwu;uwU;uWu;UWU]]
    $image[$jsonRequest[https://some-random-api.ml/img/panda;link;Could not load a cat image! ( API Down or another ban :/ )]]
	$cooldown[5s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
    $color[RANDOM]
    `
})

//Adding Encoder for base64 soon too!

bot.command({
    name: "base64",
    aliases: "base",
    code: `
	$description[
Your Message:
$message

Base64 Encode:
$jsonRequest[https://some-random-api.ml/base64?encode=$replaceText[$message; ;+];base64;Could not load the base64 decoder.]]
	$cooldown[5s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
    $color[RANDOM]
    `
})

bot.command({
    name: "hug",
    code: `$if[$isMentioned[$authorID]==true]
	You can't hug yourself! sowwy :'(
	$elseIf[$message[1]==$nickname[$authorID]]
	You can't hug yourself! sowwy :'(
	$endelseIf
	$else
	$dm[]
	<@$authorID> gives $message[1] a hug
	$image[$jsonRequest[https://some-random-api.ml/animu/hug;link;Could not load "link" in random.hug.api]]
	$cooldown[5s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
    $color[RANDOM]
	$endIf
	$argsCheck[1;Usage: !hug @user]
    `
})

bot.command({
    name: "wasted",
    code: `
	$if[$isMentioned[$mentioned[1]==true]]
	$description[Wasted moment for <@$mentioned[1]>]
	$image[https://some-random-api.ml/canvas/wasted?avatar=$replaceText[$userAvatar[$mentioned[1]];.webp;.png]]
    $color[RANDOM]
	$else
	Please @mention someone!
	$endIf
	$argsCheck[1;Usage: !wasted @user]
	$cooldown[5s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
    `
})

bot.command({
    name: "comment",
    code: `
	$image[https://some-random-api.ml/canvas/youtube-comment?comment=$replaceText[$message; ;+]&avatar=$replaceText[$userAvatar[$authorID];.webp;.png]&username=$replaceText[$nickname; ;+]
    $color[RANDOM]
	$argsCheck[>1;Example Usage: !comment bye world]
	$cooldown[5s;Wait %time%. This cooldown is due to not get api rate limited. Again.]
    `
})

bot.command({
    name: "hack",
    code: `
	$if[$isMentioned[$mentioned[1]]==true]
	Brute Forcing <@$mentioned[1]>'s Password...$editIn[7s;Brute Force 100% Complete. Getting Token...;Succesful grabbed token: $jsonRequest[https://some-random-api.ml/bottoken;token;Could not load the "token" in SomeRandomApi.bottoken.token.];Haha jk no one get's hacked. Just chill m8 xdddd]
    $else
	Please @mention someone to hack!
	$endIf
	`
})

bot.command({
    name: "pokedex",
    code: `
	$description[
	__:information_source: Information about the pokemon $message__
	
	:diamond_shape_with_a_dot_inside: **Type:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];type;Pokemon not found.]
	
	:gem: **Species:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];species;Pokemon not found.]	
	
	:sparkles: **Abilities:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];abilities;Could not load the "abilities" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].abilities"]
	
	:arrow_up: **Height:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];height;Could not load the "height" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].height"]
	
	:hamburger: **Weight:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];weight;Could not load the "weight" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].weight"]
	
	:brain: **Base Experience:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];base_experience;Could not load the "base_experience" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].base_experience"]
	
	:transgender_symbol: **Gender:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];gender;Could not load the "gender" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].gender"]
	
	:bar_chart: **Stats:**
	HP: $jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];stats.hp;Could not load the "stats.hp" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].stats.hp"]
	Attack: $jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];stats.attack;Could not load the "stats.attack" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].stats.attack"]
	Defense: $jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];stats.defense;Could not load the "stats.defense" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].stats.defense"]
	Speed: $jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];stats.speed;Could not load the "stats.speed" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].stats.speed"]
	
	:dna: **Evolution Line:**
	$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];family.evolutionLine;Could not load the "family.evolutionLine" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].family.evolutionLine"]
	
	]
	$thumbnail[$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];sprites.animated;Could not load the "sprites.animated" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].sprites.animated"]]
	$footer[$jsonRequest[https://some-random-api.ml/pokedex?pokemon=$replaceText[$message; ;+];description;Could not load the "description" in "SomeRandomApi.pokedex.$replaceText[$message; ;+].description"]]
	$color[RANDOM]
	`
})

bot.command({
	name: "status",
	code: `
  **api.leref.ga:**
  $jsonRequest[https://endpoint.apivoid.com/urlstatus/v1/pay-as-you-go/?key=$getVar[apikeys]&url=https://api.leref.ga;data.report.response_headers.status;Could not load class "lerefapi.pinger" in "de.bycrxhit.jsonapi.statusChecker.pinger"]

  **some-aandom-api.ml:**
  $jsonRequest[https://endpoint.apivoid.com/urlstatus/v1/pay-as-you-go/?key=$randomText[apikeys]&url=https://some-random-api.ml;data.report.response_headers.status;Could not load class "sra.pinger" in "de.bycrxhit.jsonapi.statusChecker.pinger"]

  **api.bycrxhit.de:**
  $jsonRequest[https://endpoint.apivoid.com/urlstatus/v1/pay-as-you-go/?key=$randomText[apikeys]&url=https://api.bycrxhit.de;data.report.response_headers.status;Could not load class "bycrxhitapi.pinger" in "de.bycrxhit.jsonapi.statusChecker.pinger"]
  `
})

bot.command({
	name: "eval",
	code: `
  $eval[$message]
  $onlyForIDs[$getVar[owner];You're not allowed to use this command and tho' how'd you found it?]
  `
})
