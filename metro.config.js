const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

// 确保 svg 被识别为源码文件，其它图片格式仍然正常走 asset pipeline
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
defaultConfig.resolver.sourceExts.push("svg");

module.exports = defaultConfig;
