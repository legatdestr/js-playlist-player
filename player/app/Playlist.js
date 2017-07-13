import AudioTrack from "./AudioTrack";
import Iterator from "./Iterator";


function PlaylistError(message) {
    "use strict";
    this.message = 'PlaylistError: ' + message
}

PlaylistError.prototype = Object.create(Error)


class Playlist extends Iterator {

    constructor(uris) {
        if (uris && Object.prototype.toString.call(uris) !== '[object Array]') {
            throw new PlaylistError('uris should be an Array type')
        }
        super()

        if (uris) {
            uris.forEach((item) => {
                console.log('Добавление URI: ', item)
                this.add(item)
            })
        }


    }

    add(audioTrack) {
        console.log('Добавление аудио трека в playlist: ', audioTrack)
        if (!(audioTrack instanceof AudioTrack)) {
            throw new PlaylistError('track is not instanceof AudioTrack')
        }
        if (!audioTrack.uri){
            throw new PlaylistError('audioTrack.uri is empty string: ' +  audioTrack.uri)
        }
        super.add(audioTrack)
        return this
    }
}


Playlist.PlaylistError = PlaylistError

export default Playlist;