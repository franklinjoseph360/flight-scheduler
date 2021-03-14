const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv')

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./client/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: "./client/index.jsx",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js"
    },
    plugins: [
        htmlPlugin,
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};