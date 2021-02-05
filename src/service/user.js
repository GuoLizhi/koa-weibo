const { User } = require('../db/model/index')
const { get } = require('lodash')

class UserService {
  // 获取用户信息
  async getUserInfo (options = {}) {
    const { userName, password } = options
    const whereOpts = { userName }
    if (password) {
      Object.assign(whereOpts, { password })
    }
    const result = await User.findOne({
      attributes: ['id', 'userName', 'nickName', 'avatar', 'city'],
      where: whereOpts
    })
    return get(result, 'dataValues', {})
  }

  // 用户注册
  async register (options = {}) {
    const result = await User.create(options)
    return result
  }

  // 用户注销
  async deleteUser (userName) {
    const result = await User.destroy({
      where: { userName }
    })
    return result > 0
  }

  // 更新用户信息
  async updateUser (options = {}, userInfo = {}) {
    const { newPassword, newNickName, newAvatar, newCity } = options
    const { userName, password } = userInfo
    // 拼接用户信息
    const userData = {}
    if (newPassword) userData.password = newPassword
    if (newNickName) userData.nickName = newNickName
    if (newAvatar) userData.avatar = newAvatar
    if (newCity) userData.city = newCity
    // 拼接查询条件
    const whereData = { userName }
    if (password) whereData.password = password
    const result = await User.update(userData, {
      where: whereData
    })
    // 修改的行数大于0，表示已经修改成功
    return result[0] > 0
  }
}

module.exports = new UserService()
