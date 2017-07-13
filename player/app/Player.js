import internal from "./internal";
import Playlist from "./Playlist";
import PlayStrategy from "./PlayStrategy";
import getterSetterMixin from "./mixins/getterSetter";


class Player {

    constructor(strategy, playlist) {
        const self = internal(this)
        self.playlist = null
        self.strategy = null
        playlist && (this.playlist = playlist)
        this.strategy = strategy
        return this
    }

    play() {
        return this.strategy.play(this.playlist)
    }

}

// mixin set & get for playlist property:
getterSetterMixin(Player, 'playlist', Playlist)
// mixin set & get for strategy property:
getterSetterMixin(Player, 'strategy', PlayStrategy)


export default Player;