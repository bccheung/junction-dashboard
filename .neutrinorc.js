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
            "no-unused-vars": "off"
          }
        }
      }
    }),
    react({
      html: {
        title: 'junction-dashboard'
      },
      env: [
        "GSPREADSHEET_ID",
        "GSHEET_ID",
        "GCLIENT_EMAIL",
        "GPRIVATE_KEY"
      ]
    }),
    jest(),
  ],
};
