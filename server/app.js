const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const app = express()

app.use('/graphql', graphqlHTTP(req => {
  return {
    schema,
    context: {
      // ... loaders
    },
    graphiql: true
  }
}))

app.get('/healthz', (req, res) => res.send('Oooh weee look at me!'))

module.exports = app