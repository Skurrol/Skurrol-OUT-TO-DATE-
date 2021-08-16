module.exports = {
    name: 'volume',
    code: `$if[$message>100]
	The volume can't be over 100%!
	$elseIf[$message<1]
	The Volume can't be lower than 0%!
	$endelseIf
	$else
	Set the volume to $message[1]%.
	$volume[$message]
	$endif
	$argsCheck[1;Usage: +volume <nummer>]`
}