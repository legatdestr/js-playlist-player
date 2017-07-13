import internal from "./internal"


function PlayStrategyError(msg) {
    "use strict";
    this.message = msg
}

PlayStrategyError.prototype = Object.create(Error)

class PlayStrategy {

    constructor() {

    }

    play() {
        throw new PlayStrategyError('You are calling abstract method')
    }

    stop() {
        throw new PlayStrategyError('You are calling abstract method')
    }

    pause() {
        throw new PlayStrategyError('You are calling abstract method')
    }
}


PlayStrategy.PlayStrategyError = PlayStrategyError

export default PlayStrategy