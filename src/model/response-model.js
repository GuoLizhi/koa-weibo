// 基础模型
class BaseModel {
  constructor ({ errno, data, message }) {
    this.errno = errno
    this.data = data
    this.message = message
  }
}

// 响应成功模型
class SuccessModel extends BaseModel {
  constructor ({ data = {}, message = 'success' }) {
    super({ errno: 0, data, message })
  }
}

class ErrorModel extends BaseModel {
  constructor ({ errno, message }) {
    super({ errno, message })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
