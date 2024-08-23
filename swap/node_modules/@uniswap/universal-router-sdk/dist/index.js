
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./universal-router-sdk.cjs.production.min.js')
} else {
  module.exports = require('./universal-router-sdk.cjs.development.js')
}
