import serve from 'rollup-plugin-serve';

import config from './rollup.config.js';

config[0].plugins.push(serve({
    contentBase: '.',
    port: 8000,
    openPage: '/examples/',
    open: true,
}));

export default config;
