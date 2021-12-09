const Dotenv = require('dotenv-webpack');
const path = require('path');

const envTrimmed =  process.env.NODE_ENV ? process.env.NODE_ENV.trim() : null;

module.exports =  {
    target: 'node',
    watchOptions: {
        poll: true,
        ignored: /node_modules/
      },
    entry: './src/server.js',
    plugins: [
        new Dotenv(),
    ],   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '.json']
    },
    mode: envTrimmed || 'development'
};
