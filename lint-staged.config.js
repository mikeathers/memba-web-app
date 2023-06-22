module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `eslint . --fix ${filenames.join(' ')}`,
  ],
  '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,
}
