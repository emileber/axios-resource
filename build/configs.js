const path = require('path');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const pkg = require('../package.json');

const version = process.env.VERSION || pkg.version;
const name = pkg.name;
const banner =
    `/**
 * ${name} v${version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`;

const resolve = _path => path.resolve(__dirname, '../', _path);

const configs = {
    commonjs: {
        input: resolve('src/index.js'),
        file: resolve(`dist/${name}.common.js`),
        format: 'cjs',
    },
    esm: {
        input: resolve('src/index.esm.js'),
        file: resolve(`dist/${name}.esm.js`),
        format: 'es',
    },
};

function genConfig(opts) {
    const config = {
        input: {
            input: opts.input,
            plugins: [
                replace({
                    __VERSION__: version,
                }),
                buble(),
            ],
            external: ['axios', 'object-assign', 'pope'],
        },
        output: {
            banner,
            file: opts.file,
            format: opts.format,
            name: 'AxiosResource',
        },
    };

    if (opts.env) {
        config.input.plugins.unshift(replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
        }));
    }

    return config;
}

function mapValues(obj, fn) {
    const res = {};
    Object.keys(obj).forEach((key) => {
        res[key] = fn(obj[key], key);
    });
    return res;
}

module.exports = mapValues(configs, genConfig);
