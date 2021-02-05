const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
})
const seq = require('./seq')

require('./model/index')

seq.sync({ force: true }).then(() => {
  process.exit()
})
