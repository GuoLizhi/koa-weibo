const Sequelize = require('sequelize')
const { isProd, isTest } = require('../utils/env')

const {
  DB_MYSQL_HOST,
  DB_MYSQL_PORT,
  DB_MYSQL_USER,
  DB_MYSQL_PASSWORD,
  DB_MYSQL_DATABASE
} = process.env

const COMMON_CONF = {
  host: DB_MYSQL_HOST,
  port: DB_MYSQL_PORT,
  dialect: 'mysql'
}

if (isTest) {
  COMMON_CONF.logging = () => {}
}

if (isProd) {
  COMMON_CONF.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

const seq = new Sequelize(
  DB_MYSQL_DATABASE,
  DB_MYSQL_USER,
  DB_MYSQL_PASSWORD,
  COMMON_CONF
)

module.exports = seq
