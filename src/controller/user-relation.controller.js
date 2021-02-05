const { getUserFollowers } = require('../service/user-relation.service')
const { SuccessModel } = require('../model/response-model')

class UserRelationController {
  // 根据userId获取用户的粉丝列表
  async getFans (ctx) {
    const userId = ctx.params.userId
    const result = await getUserFollowers(userId)
    ctx.body = new SuccessModel(result)
  }
}

module.exports = new UserRelationController()
