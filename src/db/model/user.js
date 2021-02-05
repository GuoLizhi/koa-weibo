const seq = require('../seq')
const { STRING, DECIMAL } = require('sequelize')
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  nickname: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '1男 2女 3保密'
  },
  avatar: {
    type: STRING
  },
  city: {
    type: STRING
  }
})

module.exports = User
