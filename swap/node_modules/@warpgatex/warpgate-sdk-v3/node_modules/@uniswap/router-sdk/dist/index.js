
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./router-sdk.cjs.production.min.js')
} else {
  module.exports = require('./router-sdk.cjs.development.js')
}
