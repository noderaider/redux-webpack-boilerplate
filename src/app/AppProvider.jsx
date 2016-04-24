if (__DEV__) {
  module.exports = require('./AppProvider.dev')
} else {
  module.exports = require('./AppProvider.prod')
}
