const micromatch = require('micromatch');

module.exports = {
  '*.{js,json,css}': files => {
    const match = micromatch.not(files, '**/{docs,website}/**/*.*');

    return [
      ...match.map(file => `eslint ${file}`),
      ...match.map(file => `prettier --write ${file}`),
      ...match.map(file => `git add ${file}`),
    ];
  },
};
