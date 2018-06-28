# New things I've learnt

package.json:

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack" //add webpack
  },
  "devDependencies": {
    "css-loader": "^0.28.11", //sass
    "extract-text-webpack-plugin": "^4.0.0-alpha.0",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.3", //end-sass
    "webpack": "^4.12.2",
    "webpack-cli": "^3.0.8"
  }
```

npm install:
--save-dev - production  
--save - build


npm install css-loader webpack webpack-cli extract-text-webpack-plugin node-sass sass-loader babel-loader babel-core babel-preset-env


webpack.config.js
```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/scss/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    // Add loader
    rules: [{
      test: /\.(scss)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    // Specify output file name and path
    new ExtractTextPlugin({
      filename: 'main.css'
    })
  ]
};
```

## Gotchas

* extract-text-webpack-plugin@next
* create .babelrc:

```js
```