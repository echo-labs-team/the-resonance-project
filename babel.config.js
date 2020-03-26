module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/flow'],
    plugins: ['@babel/plugin-proposal-optional-chaining'],
  };
};
