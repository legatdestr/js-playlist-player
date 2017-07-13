import internal from "./internal";
import AudioPool from "./AudioPool";


function AudioTrackError(msg) {
    "use strict";
    this.message = 'AudioTrackError: ' + msg
}

AudioTrackError.prototype = Object.create(Error)

let
    noop = new Function(),
    createFeedbackMsg = (track, e) => {
        "use strict";
        let res = {
            track: track
        }
        e && (res['e'] = e)
        return res
    }


class AudioTrack {

    constructor(uri) {
        console.log('AudioTrack constructor uri:', uri)
        let self = internal(this)
        self.uri = ''
        if (uri){
            this.uri = uri
        }
        window.audInMap = internal(this)
        console.log('window.audInMap')

        console.log('this.uri: ', this.uri)
        self.audio = null
        self.loaded = false
        self.played = false
        return this
    }

    get uri() {
        return internal(this).uri
    }

    set uri(uri) {
        console.log('set uri on AudioTrack is invoked. uri: ', uri)
        if (typeof uri !== 'undefined' && Object.prototype.toString.call(uri) !== '[object String]') {
            throw  new AudioTrackError('uri is not typeof string !')
        }
        internal(this).uri = uri
        console.log('AudioTrack new uri: ', internal(this).uri, this)


        return this
    }

    load(successCallback, errorCallback) {
        if (successCallback && typeof successCallback !== 'function') throw new AudioTrackError('successCallback is not a function!')
        if (errorCallback && typeof errorCallback !== 'function') throw new AudioTrackError('errorCallback is not a function!')
        successCallback = successCallback || noop
        errorCallback = errorCallback || noop
        console.log(internal(this))

        return new Promise((resolve, reject) => {
            let self = internal(this), audio
            self.audio = self.audio || AudioPool.allocate()
            audio = self.audio
            self.played = false
            audio.autoplay = false
            audio.preload = 'auto'
            audio.autobuffer = true
            audio.volume = 1
            audio.oncanplaythrough = () => {
                let res = createFeedbackMsg(self)
                resolve(res) && successCallback(res)
                self.loaded = true
                audio.oncanplaythrough = null
            }
            audio.onerror = (e) => {
                let res = createFeedbackMsg(self, e)
                reject(res) && errorCallback(res)
                self.loaded = false
                audio.onerror = null
            }
            audio.src = self.uri
            console.log('load self: ', self)
        })
    }

    play(successCallback, errorCallback) {
        let self = internal(this)
        if (successCallback && typeof successCallback !== 'function') throw new AudioTrackError('successCallback is not a function!')
        if (errorCallback && typeof errorCallback !== 'function') throw new AudioTrackError('errorCallback is not a function!')
        if (!self.loaded)  throw new AudioTrackError('File is not loaded yet! Please use load method firstly!')
        if (!this.uri)  throw new AudioTrackError('Uri is empty!')
        successCallback = successCallback || noop
        errorCallback = errorCallback || noop

        return new Promise((resolve, reject) => {
            let audio = self.audio
            audio.onended = () => {
                let res = createFeedbackMsg(self)
                resolve(res) && successCallback(res)
                self.played = true
                audio.onended = null
            }
            audio.onerror = (e) => {
                let res = createFeedbackMsg(self, e)
                reject(res) && errorCallback(res)
                self.played = false
                audio.onerror = null
            }
            audio.play();
        })
    }

    reset() {
        let self = internal(this)
        self.uri = ''
        self.audio && AudioPool.reset(self.audio)
        self.audio = null
        self.loaded = false
        self.played = false
    }
}


export default AudioTrack