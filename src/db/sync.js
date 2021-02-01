const seq = require('./seq')

seq.sync({ force: true }).then(() => {
  process.exit()
})
