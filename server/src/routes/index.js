const spotify = require('./spotify')

module.exports = app => {
  app.use('/', spotify)
}
