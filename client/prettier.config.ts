import { type Config } from 'prettier';

const config: Config = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',

  // Indentation and spacing
  tabWidth: 2,
  useTabs: false,

  // Line length and wrapping
  printWidth: 80,
  proseWrap: 'preserve',

  // Bracket and parentheses formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',

  // HTML/JSX specific
  htmlWhitespaceSensitivity: 'css',

  // JSX specific
  jsxSingleQuote: true,

  // End of line
  endOfLine: 'lf',

  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',

  // File type overrides
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
        printWidth: 100,
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
  ],
};

export default config;
