const winston = require('winston')

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: level,
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: 'SERVER'
    })
  ]
})

// create stream for morgan
logger.stream = {
  write: message => logger.info(message)
}

module.exports = logger
