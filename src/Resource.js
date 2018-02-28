import axios from 'axios';
import objectAssign from 'object-assign';
import template from './template';

export default class Resource {
    /**
     * @param {object} [options]
     * @param {string} [options.http] - pass an specific axios instance.
     * @param {string} [options.idAttribute] - override the default id url key.
     * @param {string} [options.url] - override the url.
     */
    constructor(options = {}) {
        const statics = this.constructor;
        this.idAttribute = options.idAttribute || statics.ID_ATTRIBUTE || 'id';
        this.http = options.http || axios;
        this._url = options.url || statics.URL || '';
    }

    /**
     * Override this to dynamically build an URL.
     * @returns {string}
     */
    url(keys) {
        return template(this._url, keys || {}, { regex: /{(.*?)}/g });
    }

    /**
     * Applies the id automatically within the keys.
     * @param {string} [id]
     * @param {Object} [options]
     * @returns {{keys: {}}}
     */
    applyUrlKeys(id, options) {
        if (!id) return options;
        const keys = (options || {}).keys;
        return objectAssign({}, options, {
            keys: objectAssign({ [this.idAttribute]: id }, keys),
        });
    }

    /**
     * @param {string} id
     * @param {Object} [options]
     * @returns {*}
     */
    fetch(id, options) {
        return this.sync('get', null, this.applyUrlKeys(id, options));
    }

    /**
     * @param {Object} attrs
     * @param {Object} [options]
     * @returns {PromiseLike<T>|Promise<T>|*}
     */
    create(attrs, options) {
        return this.sync('post', attrs, options);
    }

    /**
     * @param {string} id
     * @param {Object} attrs
     * @param {Object} [options]
     * @returns {PromiseLike<T>|Promise<T>|*}
     */
    patch(id, attrs, options) {
        return this.sync('patch', attrs, this.applyUrlKeys(id, options));
    }

    /**
     * @param {string} id
     * @param {Object} [options]
     * @returns {PromiseLike<T>|Promise<T>|*}
     */
    delete(id, options) {
        return this.sync('delete', null, this.applyUrlKeys(id, options));
    }

    /**
     * The function is passed the raw response object, and should return the attributes hash.
     * @param {Object} response
     * @returns {Object}
     */
    parse(response) {
        return response;
    }

    /**
     * Hook for every request type on a resource.
     * @param {string} method
     * @param {Object|null} [data]
     * @param {Object} [options]
     * @returns {PromiseLike<T>|Promise<T>|*}
     */
    sync(method, data, options = {}) {
        return this.http(objectAssign({
            url: this.url(options.keys),
            method,
            data,
        }, options)).then(response => this.parse(response));
    }
}
