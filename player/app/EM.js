import Iterator from "./Iterator"
import Playlist from "./Playlist"
import Player from './Player'
import AudioTrack from './AudioTrack'
import AudioTrackPool from "./AudioTrackPool"
import AudioPool from './AudioPool'
import PlayStrategy from "./PlayStrategy"
import PreloadPlayStrategy from "./PreloadPlayStrategy"


var EM = typeof (EM) === 'object' ? EM : EM;

EM = {
    Playlist,
    Player,
    AudioTrack,
    AudioTrackPool,
    AudioPool,
    PlayStrategy,
    PreloadPlayStrategy,
    Iterator
}

export default  EM