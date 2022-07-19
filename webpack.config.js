const path = require("path");
const dotenv = require("dotenv");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

const config = {
    entry: {
        app: "./src/scripts/index.js",
    },
    mode: process.env.MODE,
    devServer: {
        port: process.env.PORT,
        compress: true,
        open: true,
        static: "./dist",
    },
    target: "web",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["app"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                type: "asset/resource",
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
        ],
    },
};

module.exports = config;
