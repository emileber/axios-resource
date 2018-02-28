export function isObj(obj) {
    return obj !== null && typeof (obj) === 'object';
}

/**
 * @description get nested properties from a given
 * object using dot notation
 *
 * @method prop
 *
 * @param  {Object} obj
 * @param  {Array|string} path
 *
 * @return {*}
 */
export function prop(obj, path) {
    if (typeof path === 'string') path = path.split('.');
    if (!isObj(obj) || !path) {
        return obj;
    }

    for (let i = 0; i < path.length; ++i) {
        const p = path[i];
        if (!Object.prototype.hasOwnProperty.call(obj, p)) return undefined;
        obj = obj[path[i]];
    }
    return obj;
}
