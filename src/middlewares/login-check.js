const { ErrorModel } = require('../model/response-model')
const { loginCheckFailInfo } = require('../model/error-info')

// 检测用户是否登录中间件
async function loginCheck (ctx, next) {
  if (ctx.session.userInfo) {
    console.log(ctx.session.userInfo)
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

module.exports = {
  loginCheck
}
