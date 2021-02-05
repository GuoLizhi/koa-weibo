const seq = require('../seq')
const { INTEGER } = require('sequelize')

const UserRelation = seq.define('UserRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的id'
  }
})

module.exports = UserRelation
