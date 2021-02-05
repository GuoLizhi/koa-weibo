const { User, UserRelation } = require('../db/model/index')
const sequelize = require('sequelize')

class UserRelationService {
  // 获取某个用户的粉丝列表
  async getUserFollowers (followerId) {
    const result = await User.findAndCountAll({
      attributes: ['id', 'userName', 'nickname', 'avatar'],
      order: [
        ['id', 'desc']
      ],
      include: [
        {
          model: UserRelation,
          where: {
            followerId,
            userId: {
              [sequelize.Op.ne]: followerId
            }
          }
        }
      ]
    })

    return {
      count: result.count
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
}

module.exports = new UserRelationService()
