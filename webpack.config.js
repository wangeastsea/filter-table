var path = require('path')
var webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV;
console.log("-----NODE_ENV===", NODE_ENV);
module.exports = {
    entry: NODE_ENV == 'development' ? './src/main.js' : './src/components/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'usmart-filter-table.js',
        library: 'usmart-filter-table',
        libraryTarget: 'umd',
        umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                'vue-style-loader',
                'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                    ],
                    'sass': [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                    ]
                }
                // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
                },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        resourceQuery: /vue/,
                        use: [
                        {
                            loader: 'pug-plain-loader'
                        }
                        ]
                    },
                    {
                        use: [
                        {
                            loader: 'raw-loader'
                        },
                        {
                            loader: 'pug-plain-loader'
                        }
                        ]
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                            name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                        }
                    }
                    ]
                },
        ]
    },
    resolve: {
        alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, './src')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
