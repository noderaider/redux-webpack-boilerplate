if (__DEV__) {
  module.exports = require('./App.dev')
} else {
  module.exports = require('./App.prod')
}
