import template from 'pupa';
import axios from 'axios';
import objectAssign from 'object-assign';

/**
 * @property {string} idAttribute
 */
export default class Resource {
    constructor(options = {}) {
        this.idAttribute = options.idAttribute || 'id';
        this._url = options.url || this.constructor.URL || '';
        this.http = options.http || axios;
    }

    /**
     * Override this to dynamically build an URL.
     * @returns {string}
     */
    url(keys) {
        return template(this._url, keys || {});
    }

    /**
     *
     * @param {string} id
     * @param {Object} [options]
     * @returns {{keys: {}}}
     */
    getUrlKeys(id, options) {
        return objectAssign({
            keys: {
                [this.idAttribute]: id,
            },
        }, options);
    }

    /**
     * @param {string} id
     * @param {Object} [options]
     * @returns {*}
     */
    fetch(id, options) {
        return this.sync('get', null, this.getUrlKeys(id, options));
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
        return this.sync('patch', attrs, this.getUrlKeys(id, options));
    }

    /**
     * @param {string} id
     * @param {Object} [options]
     * @returns {*}
     */
    delete(id, options) {
        return this.sync('delete', null, this.getUrlKeys(id, options));
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
     * @returns {PromiseLike<T> | Promise<T> | *}
     */
    sync(method, data, options = {}) {
        return this.http(objectAssign({
            url: this.url(options.keys),
            method,
            data,
        }, options)).then(response => this.parse(response));
    }
}
