module.exports = {
    name: 'mp3',
    code: `$description[**[Generated Link](https://www.yt-download.org/api/widget/mp3/$replaceText[$message[1];https://www.youtube.com/watch?v=;])**]
  $image[https://i.ytimg.com/vi/$replaceText[$message[1];https://www.youtube.com/watch?v=;]/mqdefault.jpg]
  $color[RED]
  $argsCheck[1;Example a+mp3 \`https://youtube.com/watch?v=VideoID\`]`
}