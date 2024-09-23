module.exports = function (api) {
  const isProduction = api.env('production');
  api.cache(false);
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    isProduction ? 'transform-remove-console' : null,
  ].filter(Boolean);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
