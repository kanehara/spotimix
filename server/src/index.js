require('dotenv').config({path: `${__dirname}/../.env`})
const app = require('./app')
const morgan = require('morgan')
const logger = require('./logger')

app.use(morgan('combined', {stream: logger.stream}))

const PORT = process.env.PORT || 4000
app.listen(PORT)
logger.info(`Listening on port ${PORT}`)
