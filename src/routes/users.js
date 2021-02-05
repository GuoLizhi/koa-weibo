const router = require('koa-router')()
const { isUserExist, register } = require('../controller/user.controller')
router.prefix('/users')

router.post('/isUserExist', isUserExist)
router.post('/register', register)

module.exports = router
