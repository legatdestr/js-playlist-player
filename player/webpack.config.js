const path = require('path');

const config = {
    entry: './app/index.js',
    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, 'dist'),
        // the filename template for entry chunks
        filename: 'em.player.js', // string

        publicPath: "/assets/", // string
        // the url to the output directory resolved relative to the HTML page

        /*
         This makes your library bundle to be available as a global variable when imported.
         To make the library compatible with other environments, add libraryTarget property to the config.
         */

        library: "EM", // string,
        // the name of the exported library

        libraryTarget: "this", // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
        // the type of the exported library

        /* Advanced output configuration (click to show) */

    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015"],
                        }
                    }
                ]
            },

        ]
    },
    plugins: []
};


module.exports = config;