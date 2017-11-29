const authCodeRouter = require('./authorization_code')

module.exports = app => {
  app.use('/', authCodeRouter)
}
