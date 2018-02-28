import { prop } from './utils';

const regex = /{{2}(.+?)}{2}/g;

/**
 * Parses a given template string and
 * replace dynamic placeholders with actual data.
 *
 * @param {string} template
 * @param {Object} [data]
 * @param {Object} [options]
 */
export default function (template, data, options = {}) {
    if (typeof template !== 'string') return '';
    return template.replace(options.regex || regex, (match, key) => {
        const value = prop(data, key.trim());
        if (value == null) {
            if (options.throwOnUndefined) {
                throw new ReferenceError(`Missing value for ${match}`);
            }
            return options.skipUndefined ? match : '';
        }
        return value;
    });
}
