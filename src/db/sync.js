const seq = require('./seq')

require('./model/index')

seq.sync({ force: true }).then(() => {
  process.exit()
})
