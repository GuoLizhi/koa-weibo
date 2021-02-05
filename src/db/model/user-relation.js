const seq = require('../seq')
const { INTEGER } = require('sequelize')

const UserRelation = seq.define('UserRelation', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  followerId: {
    type: INTEGER,
    allowNull: false
  }
})

module.exports = UserRelation
