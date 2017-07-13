const
    map = new WeakMap(),
    internal = (object) => {
        if (!map.has(object)) {
            map.set(object, {})
        }
        return map.get(object)
    }

export default internal
