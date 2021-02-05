const User = require('./user')
const UserRelation = require('./user-relation')

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  UserRelation
}
