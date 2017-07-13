import EM from "./EM";


// example of usage:
let
    playStrategy = new EM.PreloadPlayStrategy(),

    uris = function () {
        let res = []
        let i = 10
        while (i > 0) {
            res.push(EM.AudioTrackPool.allocate('/projects/talon/kupryashin/' + i + '.mp3'))
            i--
        }

        return res
    }(),

    player = new EM.Player(playStrategy, new EM.Playlist(uris))

window.player = player

module.exports = EM;
