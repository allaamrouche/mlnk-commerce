const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';

const dirApp = path.join(__dirname, 'app');
const dirStyles = path.join(__dirname, 'styles');

module.exports = {
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  devtool: IS_DEVELOPMENT ? 'source-map' : false, 
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 100000,
    hints: 'warning'
  },
  entry: {
    main: [
      path.join(dirApp, 'index.js'),
      path.join(dirStyles, 'index.scss')
    ],
    editor: path.join(dirApp, 'editor.js') 
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/[name].js',
    publicPath: '/wordpress-theme/wp-content/themes/malanka/assets/',
  },
  resolve: {
    modules: [
      dirApp,
      dirStyles,
      'node_modules'
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CleanWebpackPlugin(),
    ...(IS_DEVELOPMENT ? [] : [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['mozjpeg', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              }],
            ],
          },
        },
      }),
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|fnt)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: !IS_DEVELOPMENT,
    minimizer: [new TerserPlugin()],
  },
};



// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

// const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';

// const dirApp = path.join(__dirname, 'app');
// const dirStyles = path.join(__dirname, 'styles');

// module.exports = {
//   mode: IS_DEVELOPMENT ? 'development' : 'production',
//   devtool: IS_DEVELOPMENT ? 'source-map' : false, 
//   performance: {
//     maxEntrypointSize: 400000,
//     maxAssetSize: 100000,
//     hints: 'warning'
//   },
//   entry: {
//     main: [
//       path.join(dirApp, 'index.js'),
//       path.join(dirStyles, 'index.scss')
//     ]
//   },
//   output: {
//     path: path.resolve(__dirname, 'assets'),
//     filename: 'js/[name].js',
//     publicPath: '/wordpress-theme/wp-content/themes/malanka/assets/',
//   },
//   resolve: {
//     modules: [
//       dirApp,
//       dirStyles,
//       'node_modules'
//     ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: 'css/[name].css',
//     }),
//     new CleanWebpackPlugin(),
//     // Only add ImageMinimizerPlugin in production mode
//     ...(IS_DEVELOPMENT ? [] : [
//       new ImageMinimizerPlugin({
//         minimizer: {
//           implementation: ImageMinimizerPlugin.imageminMinify,
//           options: {
//             plugins: [
//               ['gifsicle', { interlaced: true }],
//               ['mozjpeg', { progressive: true }],
//               ['optipng', { optimizationLevel: 5 }],
//               [
//                 'svgo',
//                 {
//                   plugins: [
//                     {
//                       name: 'removeViewBox',
//                       active: false,
//                     },
//                   ],
//                 },
//               ],
//             ],
//           },
//         },
//       }),
//     ]),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpg|gif|jpeg|svg|webp)$/,
//         type: 'asset/resource',
//         generator: {
//           filename: 'img/[name].[hash][ext]'
//         }
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf|fnt)$/,
//         type: 'asset/resource',
//         generator: {
//           filename: 'fonts/[name].[hash][ext]'
//         }
//       },
//     ]
//   },
//   optimization: {
//     minimize: !IS_DEVELOPMENT,
//     minimizer: [new TerserPlugin()],
//   },
// };

