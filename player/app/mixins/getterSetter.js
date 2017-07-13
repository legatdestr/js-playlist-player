import internal from "../internal"


function GetterSetterError(message) {
    "use strict";
    this.message = message
}


GetterSetterError.prototype = Object.create(Error)


export default function (RecipientClass, propName, PropClass) {
    "use strict";
    if (typeof RecipientClass !== 'function') {
        throw new GetterSetterError('getterSetter mixin type error! RecipientClass should be a function!')
    }

    if (!propName || Object.prototype.toString.call(propName) !== '[object String]') {
        throw new GetterSetterError('propName should be a string and should not be empty!')
    }

    if (typeof PropClass !== 'function') {
        throw new GetterSetterError('getterSetter mixin type error! PropClass should be a function!')
    }

    let o = {};

    o[propName] = {
        configurable: false,
        enumerable: true,
        set: function (propVal) {
            if (propVal instanceof PropClass === false) {
                throw new GetterSetterError('getterSetter mixin type error ')
            }
            internal(this)[propName] = propVal
            console.log('set invoked, propName: ' + propName)
            return this
        },
        get: function () {
            console.log('get invoked, propName: ' + propName)
            return internal(this)[propName]
        }
    }

    Object.defineProperties(RecipientClass.prototype, o)
}
