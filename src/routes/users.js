const router = require('koa-router')()
const {
  isUserExist,
  register,
  login,
  deleteUser
} = require('../controller/user.controller')
const { loginCheck } = require('../middlewares/login-check')
router.prefix('/users')

router.post('/isUserExist', isUserExist)
router.post('/register', register)
router.post('/login', login)
router.post('/delete', loginCheck, deleteUser)

module.exports = router
