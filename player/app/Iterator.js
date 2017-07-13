import internal from "./internal";


class Iterator {

    constructor() {
        internal(this).items = []
        internal(this).nextPos = 0
        internal(this).curPos = -1
        return this
    }

    reset() {
        internal(this).nextPos = 0
        return this
    }

    next() {
        let
            self = internal(this),
            items = self.items,
            res = this.hasNext() ? items[self.nextPos++] : false
        console.log('next invoked result: ', res)
        self.curPos = res ? self.nextPos : -1
        return res
    }

    add(item) {
        if (typeof item === 'undefined') {
            throw new Error('item cannot be empty')
        }
        internal(this).items.push(item)
        return this
    }

    hasNext() {
        let self = internal(this)
        return self.nextPos < self.items.length
    }

    get pos() {
        return internal(this).curPos
    }

    set pos(val) {
        throw new Error('Property pos is not writable!')
    }

    get count() {
        return internal(this).items.length
    }

    set count(val) {
        throw new Error('Property count is not writable!')
    }

}

export default Iterator