const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log(err)
})

function set (key, value, timeout = 3600) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}

function get (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err)
        return
      }
      if (value === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(value))
      } catch (ex) {
        resolve(value)
      }
    })
  })
}

module.exports = {
  get,
  set
}
