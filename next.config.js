const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const isProd = process.env.NODE_ENV === "production";

// const nextConfig = {
//     assetPrefix: isProd ? '' : '',
//     generateBuildId: async () => {
//         if (process.env.BUILD_ID) {
//             return process.env.BUILD_ID;
//         } else {
//             return `${new Date().getTime()}`;
//         }}
// }

module.exports = withPlugins([
  [
    optimizedImages,
    {
      // these are the default values so you don't have to provide them if they are good enough for your use-case.
      // but you can overwrite them here with any valid value you want.
      inlineImageLimit: 8192,
      imagesFolder: "images",
      imagesName: "[name]-[hash].[ext]",
      handleImages: ["jpeg", "png", "svg", "webp", "gif", "ico"],
      optimizeImages: true,
      optimizeImagesInDev: true,
      mozjpeg: {
        quality: 75,
      },
      optipng: {
        optimizationLevel: 5,
        bitDepthReduction: true,
      },
      pngquant: false,
      gifsicle: {
        interlaced: true,
        optimizationLevel: 3,
      },
      svgo: {
        // enable/disable svgo plugins here
      },
      webp: {
        preset: "default",
        quality: 75,
      },
    },
  ],
]);
