module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv"],
    'nativewind/babel',
    'react-native-reanimated/plugin',// segun sus docs, este plugin siempre debe ir al final
  ],
};
