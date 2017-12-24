require('dotenv').config({path: `${__dirname}/../.env`})
const app = require('./app')
const morgan = require('morgan')
const logger = require('./logger')

app.use(morgan('combined', {stream: logger.stream}))

app.listen(4000)
logger.info('Listening on port 4000')
