const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                    // this matches `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            "vue-style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: true,
                                    localIdentName: "[local]_[hash:base64:5]",
                                },
                            },
                        ],
                    },
                    // this matches plain `<style>` or `<style scoped>`
                    {
                        use: ["vue-style-loader", "css-loader"],
                    },
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            indentedSyntax: true,
                            // sass-loader version >= 8
                            sassOptions: {
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "vue-style-loader" },
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.styl(us)?$/,
                use: ["vue-style-loader", "css-loader", "stylus-loader"],
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.pug$/,
                oneOf: [
                    // this applies to `<template lang="pug">` in Vue components
                    {
                        resourceQuery: /^\?vue/,
                        use: ["pug-plain-loader"],
                    },
                    // this applies to pug imports inside JavaScript
                    {
                        use: ["raw-loader", "pug-plain-loader"],
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: (file) =>
                    /node_modules/.test(file) && !/\.vue\.js/.test(file),
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@vue/babel-preset-jsx", "@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                },
            },
            // {
            //     test: /\.svg$/,
            //     use: ["babel-loader", "vue-svg-loader"],
            // },
            {
                test: /\.svg$/i,
                type: "asset",
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                use: ["@svgr/webpack", "url-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public/*"),
                    filter: async (resourcePath) => {
                        // const data = await fs.promises.readFile(resourcePath);
                        // const content = data.toString();
                        const filterContent = ["index.html"];

                        if (resourcePath.includes(filterContent)) {
                            return false;
                        }

                        return true;
                    },
                    to({ context, absoluteFilename }) {
                        return Promise.resolve("[name][ext]");
                    },
                },
            ],
        }),
    ],
};
