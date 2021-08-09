const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");

module.exports = (env, argv) => {
    const prod = argv.mode !== "production";
    return {
        entry: {
            main: "./src/main.tsx",
        },
        output: {
            filename: "[name].[contenthash:8].js",
            path: path.resolve(__dirname, "dist"),
            chunkFilename: "[name].[contenthash:8].js",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                        {
                            loader: "ts-loader",
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                    loader: "file-loader",
                    options: {
                        name: "[name][contenthash:8].[ext]",
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name][contenthash:8].[ext]",
                        outputPath: "assets/img",
                        esModule: false,
                    },
                },
                {
                    test: /\.s?css$/,
                    use: [
                        prod ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: () => [autoprefixer()],
                            },
                        },
                        "sass-loader",
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash:8].css",
                chunkFilename: "[name].[contenthash:8].css",
            }),
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, "public", "index.html"),
                favicon: "./public/favicon.ico",
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src')
            },
            extensions: ["*", ".ts", ".tsx", ".js", ".json"],
        },
        optimization: {
            moduleIds: "hashed",
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        priority: -10,
                        chunks: "all",
                    },
                },
            },
        },
        devServer: {
            historyApiFallback: true,
            proxy: {
                "/api": "http://localhost:3000"
            }
        },
    };
};
