var bunyan = require('bunyan');
var blackhole = require('stream-blackhole');

module.exports = function (name) {
  name = name || '/dev/null';

  return bunyan.createLogger({
    name: name,
    stream: blackhole()
  })
};
