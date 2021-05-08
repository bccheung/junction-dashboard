const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

require('dotenv').config();  // Load in .env file, if present

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb({
      eslint: {
        baseConfig: {
          extends: ['plugin:prettier/recommended'],
          rules: {
            'no-console': 'off',
            'no-nested-ternary': 'off'
          }
        }
      }
    }),
    react({
      hot: false,
      html: {
        title: 'TCCC English - Junction Dashboard'
      },
      style: {
        test: /\.(css|sass|scss)$/,
        modulesTest: /\.module\.(css|sass|scss)$/,
        loaders: [
          {
            loader: "sass-loader",
            useId: "sass"
          }
        ]
      },
      env: ['GSPREADSHEET_ID']
    }),
    jest()
  ],
};
