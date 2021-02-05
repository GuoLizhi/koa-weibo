const userService = require('../service/user.service')
const { registerUserNameExistInfo, registerFailInfo, registerUserNameNotExistInfo } = require('../model/error-info')
const { ErrorModel, SuccessModel } = require('../model/response-model')

class UserController {
  // check
  async isUserExist (ctx) {
    const { userName } = ctx.request.body
    const result = await userService.getUserInfo({ userName })
    return result ? new SuccessModel(result) : new ErrorModel(registerUserNameNotExistInfo)
  }

  // user register
  async register (ctx) {
    const { userName, password, gender, nickname } = ctx.request.body
    const userInfo = await userService.getUserInfo({ userName })
    // check userName if exist
    if (userInfo) {
      ctx.body = new ErrorModel(registerUserNameExistInfo)
    }
    // register
    try {
      await userService.register({
        userName,
        password,
        gender,
        nickname: nickname || userName
      })
      ctx.body = new SuccessModel({ message: '注册成功' })
    } catch (ex) {
      console.log(ex)
      ctx.body = new ErrorModel(registerFailInfo)
    }
  }
}

module.exports = new UserController()
