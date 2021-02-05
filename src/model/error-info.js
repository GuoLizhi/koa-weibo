module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    errno: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 删除用户失败
  deleteUserFailInfo: {
    errno: 10010,
    message: '删除用户失败'
  },
  // 未登录
  loginCheckFailInfo: {
    errno: 10005,
    message: '您尚未登录'
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    errno: 10008,
    message: '修改基本信息失败'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    errno: 10006,
    message: '修改密码失败，请重试'
  }
}
