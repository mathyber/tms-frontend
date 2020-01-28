const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader'
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[path][name].[ext]',
                    }
                }
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname,  'dist'),
        port: 9000,
        proxy: {
            "/api/**": {
                target: "http://localhost:5000/"
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TMS'
        })]
};
