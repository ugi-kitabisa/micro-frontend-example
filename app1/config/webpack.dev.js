const { merge } = require("webpack-merge");
const path = require("path");
const { ModuleFederationPlugin } = require('webpack').container;
const commonConfig = require("./webpack.common.js");
const packageJson = require("../package.json");
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

const devConfig = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: devConf.endpoint,
    },
    devServer: {
        port: devConf.port,
        historyApiFallback: {
            disableDotRule: true,
        },
    },
    devtool: "eval",
    plugins: [
        /* Don't Delete */
        ...configMFP,
    ],
};

module.exports = merge(commonConfig, devConfig);
