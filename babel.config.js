module.exports = function (api) {
  const isProd = api.env('production');

  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      'react-native-reanimated/plugin',
      '@babel/plugin-proposal-optional-chaining',
      ...(isProd ? ['transform-remove-console'] : []),
    ],
  };
};
