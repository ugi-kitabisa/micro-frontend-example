const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require("webpack");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { getEnvDev } = require('./config');

const devConf = getEnvDev();

const configMFP = [
    new ModuleFederationPlugin({
        name: devConf.name,
        filename: devConf.filename,
        exposes: devConf.exposes,
        remotes: devConf.remotes,
        shared: packageJson.dependencies,
    }),
];


const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        filename: `[name].js?v=${new Date().getTime()}`,
        path: path.resolve(__dirname, './../build'),
        publicPath: '/',
        chunkLoadTimeout: 120000,
        sourcePrefix: "\t",
        clean: {
            dry: true, // Delete log file
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    }
                ],
            },
        ]
    },
    plugins: [
        /* Don't Delete */
        ...configMFP,
        new webpack.ids.HashedModuleIdsPlugin({
            context: __dirname,
            hashFunction: "sha256",
            hashDigest: "hex",
            hashDigestLength: 20,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            // new TerserPlugin({
            //     terserOptions: {
            //         format: {
            //             comments: false,
            //         },
            //     },
            //     extractComments: false,
            // }),
        ],
        emitOnErrors: false,
        removeAvailableModules: false,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        sideEffects: false,
    },
};

module.exports = merge(commonConfig, prodConfig);
