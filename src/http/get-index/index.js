let arc = require('@architect/functions')

/**
 * arc.proxy.public will proxy all http requests to /public
 * learn more about the proxy here: https://arc.codes/guides/spa
 */
exports.handler = arc.proxy.public({
  alias: {
    '/about': '/about.html',
  }
})
