const { User, UserRelation } = require('../db/model/index')
const sequelize = require('sequelize')

class UserRelationService {
  // 获取某个用户的粉丝列表
  async getUserFollowers (userId) {
    const result = await User.findAndCountAll({
      attributes: ['id', 'userName', 'nickname', 'avatar'],
      order: [
        ['id', 'desc']
      ],
      include: [
        {
          model: UserRelation,
          where: {
            followerId: userId,
            userId: {
              [sequelize.Op.ne]: userId
            }
          }
        }
      ]
    })
    const userList = result.rows.map(row => row.dataValues)

    return {
      count: result.count,
      userList
    }
  }

  // 获取某个用户关注的人列表
  async getUserFollowing (userId) {
    const result = await UserRelation.findAndCountAll({
      order: [
        ['id', 'desc']
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'userName', 'nickname', 'avatar']
        }
      ],
      where: {
        userId,
        followerId: {
          [sequelize.Op.ne]: userId
        }
      }
    })

    return {
      count: result.count
    }
  }

  // 添加关注关系
  async addFollower (userId, followerId) {
    const result = await UserRelation.create({ userId, followerId })
    return result.dataValues
  }

  // 删除关注关系
  async deleteFollower (userId, followerId) {
    const result = await UserRelation.destroy({
      where: { userId, followerId }
    })
    return result > 0
  }
}

module.exports = new UserRelationService()
