import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

import meta from './package.json' assert { type: 'json' };


function makeCssConfig({ minimize = false } = {}) {
    return {
        input: 'src/sass/geomap.sass',
        output: {
            file: `dist/${meta.name}${minimize ? '.min' : ''}.css`,
            name: 'd3',
            format: 'umd',
        },
        plugins: [
            postcss({
                minimize,
                extract: true,
            })
        ]
    };
}

const config = {
    input: 'src/index.js',
    external: Object.keys(meta.dependencies),
    output: {
        file: `dist/${meta.name}.js`,
        name: 'd3',
        format: 'umd',
        indent: false,
        extend: true,
        banner: `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`,
        globals: Object.keys(meta.dependencies || {})
            .filter(key => /^d3-/.test(key))
            .reduce((out, key) => {
                out[key] = 'd3';
                return out;
            }, { topojson: 'topojson' })
    },
    plugins: [
        babel()
    ]
};

export default [
    config,
    {
        ...config,
        output: {
            ...config.output,
            file: `dist/${meta.name}.min.js`
        },
        plugins: [
            ...config.plugins,
            terser({
                output: {
                    preamble: config.output.banner
                }
            })
        ]
    },
    makeCssConfig(),
    makeCssConfig({ minimize: true })
];
