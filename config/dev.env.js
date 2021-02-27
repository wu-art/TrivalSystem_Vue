'use strict'
const merge = require('webpack-merge')
const { NODE_ENV } = require('./prod.env')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // base_api:'"http://localhost:3000"'
})
