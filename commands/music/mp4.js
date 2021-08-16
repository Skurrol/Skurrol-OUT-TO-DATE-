module.exports = {
    name: 'mp4',
    code: `$description[**[Generated Link](https://www.yt-download.org/api/widget/videos/$replaceText[$message[1];https://www.youtube.com/watch?v=;])**]
    $image[https://i.ytimg.com/vi/$replaceText[$message[1];https://www.youtube.com/watch?v=;]/mqdefault.jpg]
    $color[RED]
    $argsCheck[1;Example a+mp4 \`https://youtube.com/watch?v=VideoID\`]`
}