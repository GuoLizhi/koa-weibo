const userService = require('../service/user.service')
const {
  registerUserNameExistInfo,
  registerFailInfo,
  registerUserNameNotExistInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/error-info')
const { ErrorModel, SuccessModel } = require('../model/response-model')
const doCrypto = require('../utils/crypto')

class UserController {
  // check if user exist
  async isUserExist (ctx) {
    const { userName } = ctx.request.body
    const result = await userService.getUserInfo({ userName })
    ctx.body = result ? new SuccessModel({}) : new ErrorModel(registerUserNameNotExistInfo)
  }

  // user register
  async register (ctx) {
    const { userName, password, gender, nickname } = ctx.request.body
    const userInfo = await userService.getUserInfo({ userName })
    // check userName if exist
    if (userInfo) {
      ctx.body = new ErrorModel(registerUserNameExistInfo)
      return
    }
    // register
    try {
      await userService.register({
        userName,
        password: doCrypto(password),
        gender,
        nickname: nickname || userName
      })
      ctx.body = new SuccessModel({ message: '注册成功' })
    } catch (ex) {
      ctx.body = new ErrorModel(registerFailInfo)
    }
  }

  // user login
  async login (ctx) {
    const { userName, password } = ctx.request.body
    const userInfo = await userService.getUserInfo({
      userName,
      password: doCrypto(password)
    })
    if (!userInfo) {
      ctx.body = new ErrorModel(loginFailInfo)
      return
    }
    if (!ctx.session.userInfo) {
      ctx.session.userInfo = userInfo
    }
    ctx.body = new SuccessModel({ message: '登录成功' })
  }

  // 删除一个用户
  async deleteUser (ctx) {
    const { userName } = ctx.request.body
    const result = await userService.deleteUser(userName)
    ctx.body = result
      ? new SuccessModel({ message: '删除成功' })
      : new ErrorModel(deleteUserFailInfo)
  }

  // 修改用户的个人信息
  async updateUserInfo (ctx) {
    const { userName } = ctx.session.userInfo
    const { nickname, avatar, city } = ctx.request.body
    const result = await userService.updateUser({
      newNickName: nickname,
      newAvatar: avatar,
      newCity: city
    }, { userName })
    if (result) {
      Object.assign(ctx.session.userInfo, {
        nickname,
        avatar,
        city
      })
      ctx.body = new SuccessModel({ message: '修改成功' })
      return
    }
    ctx.body = new ErrorModel(changeInfoFailInfo)
  }

  // 修改用户的password
  async updatePassword (ctx) {
    const { userName, password, newPassword } = ctx.request.body
    const result = await userService.updateUser({
      newPassword: doCrypto(newPassword)
    }, {
      userName,
      password: doCrypto(password)
    })
    if (result) {
      ctx.body = new SuccessModel({ message: '修改成功' })
      return
    }
    ctx.body = new SuccessModel(changePasswordFailInfo)
  }

  // 用户登出
  async logout (ctx) {
    delete ctx.session.userInfo
    ctx.body = new SuccessModel({ message: '退出成功' })
  }
}

module.exports = new UserController()
