import serve from 'rollup-plugin-serve';

import config from './rollup.config.js';

config[0].plugins.push(serve({
    contentBase: '.',
    host: '127.0.0.1',
    port: 8000,
    openPage: '/examples/',
    open: true,
}));

export default config;
