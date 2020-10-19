const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: path.join(__dirname, 'index.tsx'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/,'/sample/node_modules/']
            },
            {
                test: /\.(pdf|gif|png|jpe?g|svg)$/,
                use: 'file-loader?name=[path][name].[ext]',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, 'index.html') },
            { from: path.join(__dirname, 'sample.pdf') },
            { from: path.join(__dirname, 'sample2.pdf') },
            { from: path.join(__dirname, 'sample3.pdf') },
        ]),
    ],
    optimization: {
        minimize: true,
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3005,
        watchOptions: {
            poll: true
        }
    }
};
