const router = require('koa-router')()
const {
  isUserExist,
  register,
  login,
  deleteUser,
  updateUserInfo,
  updatePassword,
  logout
} = require('../controller/user.controller')
const { loginCheck } = require('../middlewares/login-check')
router.prefix('/users')

router.post('/isUserExist', isUserExist)
router.post('/register', register)
router.post('/login', login)
router.post('/delete', loginCheck, deleteUser)
router.patch('/updateUserInfo', loginCheck, updateUserInfo)
router.patch('/updatePassword', loginCheck, updatePassword)
router.post('/logout', loginCheck, logout)

module.exports = router
