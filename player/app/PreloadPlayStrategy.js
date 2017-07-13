import PlayStrategy from "./PlayStrategy";
import Playlist from "./Playlist";


const
    /**
     * Preloads all tracks from playlist in asynchronous manner
     * @param {Playlist} playlist
     * @returns {Promise}
     */
    preloadAll = (playlist) => {
        let promises = [], track
        playlist.reset()
        while (playlist.hasNext()) {
            track = playlist.next()
            promises.push(track.load())
        }
        return Promise.all(promises)
    },

    /**
     * Plays tracks from playlist one by one
     * @param {playlist} playlist
     * @returns {Promise}
     */
    playAll = (playlist, resolve, reject) => {
        let track = playlist.next()
        if (track) {
            track.play().then(() => {
                playAll(playlist, resolve, reject)
            }).catch((e) => {
                reject(e)
            })
        } else {
            resolve()
        }
    };


class PreloadPlayStrategy2 extends PlayStrategy {

    constructor() {
        super()
    }

    /**
     * Executes some actions:
     * 1) preload tracks
     * 2) play tracks one by one
     * 3) resolve or reject promise and invoke success callback or error callback
     * @param {Playlist} playlist
     * @returns {Promise}
     */
    play(playlist) {
        if (!playlist instanceof Playlist) {
            throw new PlayStrategy.PlayStrategyError('playlist is not an instanceof Playlist')
        }
        return new Promise(function (resolve, reject) {
            preloadAll(playlist)
                .then(() => {
                    playlist.reset()
                    playAll(playlist, resolve, reject)
                })
                .catch((reason) => {
                    reject(reason)
                })
        })
    }

}


export default PreloadPlayStrategy2