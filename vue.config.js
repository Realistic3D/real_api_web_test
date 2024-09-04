// vue.config.js
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new BrowserSyncPlugin(
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: 'http://localhost:8080', // Ensure correct format
                    files: ['src/**/*', 'public/**/*'],
                    reloadDelay: 1000,
                },
                {
                    reload: false, // Keep reload false for Vue CLI HMR to handle it
                }
            ),
        ],
    },
};
