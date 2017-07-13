import internal from "./internal";


const getFreeItem = (items) => {
    let item, isBusy, res = false
    for ([item, isBusy] of items) {
        if (!isBusy) {
            res = item
            break
        }
    }
    return res
}


class PoolError {
    constructor(message) {
        this.message = message
    }
}

PoolError.prototype = Object.create(Error)


/**
 * Generic object pool. Very simple implementation
 */
class Pool {

    /**
     * Object pool constructor
     * @param {Function} allocator returns new empty elements
     * @param {Function} resetor resetor(obj) is called on all new elements when they are (re)allocated from pool.
     */
    constructor(allocator, resetor) {
        if (typeof  allocator !== 'function') {
            throw new PoolError('allocator is not a function')
        }
        if (typeof  resetor !== 'function') {
            throw new PoolError('resetor is not a function')
        }
        let self = internal(this)
        self.allocator = allocator
        self.resetor = resetor
        self.items = new Map()
        return this
    }

    allocate() {
        let
            self = internal(this),
            items = self.items,
            item = getFreeItem(items),
            args = Array.prototype.slice.call(arguments)
        if (item === false) {
            item = self.allocator.apply(null, args)
            let isBusy = true
            items.set(item, isBusy)
        } else {
            item = self.resetor(item)
        }
        return item
    }

    reset(item) {
        let self = internal(this), items = self.items
        if (!items.has(item)) {
            throw new PoolError('No such item in the pool! Item was not created by the pool')
        }
        item = self.resetor(item)
        items.set(item, false)
        return this
    }

    destroy() {
        let self = internal(this)
        self.allocator = null
        self.resetor = null
        self.items.clear()
        self.items = null
    }

    get count() {
        return internal(this).items.size
    }
}

export default Pool