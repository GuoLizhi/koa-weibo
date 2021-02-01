const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

const MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'weibo'
}

if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
