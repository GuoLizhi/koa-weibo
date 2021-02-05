const userService = require('../service/user.service')
const {
  registerUserNameExistInfo,
  registerFailInfo,
  registerUserNameNotExistInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../model/error-info')
const { ErrorModel, SuccessModel } = require('../model/response-model')
const doCrypto = require('../utils/crypto')

class UserController {
  // check if user exist
  async isUserExist (ctx) {
    const { userName } = ctx.request.body
    const result = await userService.getUserInfo({ userName })
    return result ? new SuccessModel({}) : new ErrorModel(registerUserNameNotExistInfo)
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
}

module.exports = new UserController()
