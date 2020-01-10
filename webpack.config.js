const webpack = require('webpack');

var brand = 'aaa.svg';
console.log('webpack brand is ', brand);

var dp = new webpack.DefinePlugin({
  'webpack': {
    'brand': JSON.stringify(brand),
    'webpack': {
      'brand': JSON.stringify(brand),
    }
  }
});


//webpackConfig.prod.plugins.push(dp);
// webpackConfig.dev.plugins.push(dp);
//webpackConfig.dev.plugins.push(hwp);

module.exports = {
  plugins: [ dp ]
};
