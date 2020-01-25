import WebPack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import path from 'path';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const srcDir = 'src';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: `./${srcDir}/app/index.js`,
    output: {
        path: path.join(__dirname, 'app', 'www'),
        publicPath: '',
        filename: 'js/bundle.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: '> 5%, android >= 4.2'
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules(?!\/webpack-dev-server)/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]'
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: true
                            },
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(['app/www/css', 'app/www/js', 'app/www/img', 'app/www/fonts'], {
            root: __dirname,
            verbose: true,
            dry: !isProduction
        }),
        new ExtractTextPlugin({
            filename: 'css/bundle.[hash].css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: `${srcDir}/index.html`
        }),
        new ScriptExtHtmlWebpackPlugin({
            async: /bundle\.([0-9a-zA-Z])+\.js/
        }),
        new WebPack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
