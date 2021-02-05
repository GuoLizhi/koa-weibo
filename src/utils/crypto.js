const crypto = require('crypto')

// 用户密码加密
function doCrypto (content) {
  const str = `password=${content}&key=${process.env.PASSWORD_CRYPTO_KEY}`
  return crypto.createHash('md5').update(str).digest('hex')
}

module.exports = doCrypto
