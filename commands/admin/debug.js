module.exports = {
    name: 'debug',
    code: `$argsCheck[>1;Error 1024, missing, wrong or too many arguments What tf do u want to debug]
    $eval[$message]
    $onlyForIDs[$getVar[owner];U don't have perms to use that bro. What did you expected to happen?]`
}