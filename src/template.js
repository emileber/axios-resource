import objectAssign from 'object-assign';
import { prop } from './utils';

const regex = /{{2}(.+?)}{2}/g;

/**
 * Parses a given template string and
 * replace dynamic placeholders with actual data.
 *
 * @param {string} string
 * @param {Object} [data]
 * @param {Object} [options]
 */
export default function (string, data, options) {
    options = objectAssign({
        skipUndefined: false,
        throwOnUndefined: false,
        regex,
    }, options);

    let result;
    let formattedString = string;

    // eslint-disable-next-line no-cond-assign
    while ((result = regex.exec(string)) !== null) {
        const item = result[1].trim();
        if (item) {
            const value = prop(data, item);
            if (value !== undefined && value !== null) {
                formattedString = formattedString.replace(result[0], value);
            } else if (options.throwOnUndefined) {
                const error = new Error(`Missing value for ${result[0]}`);
                error.key = item;
                error.code = 'E_MISSING_KEY';
                throw error;
            } else if (!options.skipUndefined) {
                formattedString = formattedString.replace(result[0], '');
            }
        }
    }
    return formattedString;
}
