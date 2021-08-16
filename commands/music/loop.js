module.exports = {
    name: 'loop',
    code: `$if[$getServarVar[queue]==0]
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
    $endif`
}