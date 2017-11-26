const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const app = express()
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

// TODO: Move loaders to own module
const fetch = async (path, accessToken) => {
  try {
    const res = await axios.get(`https://api.spotify.com/v1${path}`, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    return res.status === 200 ? res.data : null
  } catch (err) {
    logger.error(`Error fetching data from path "${path}"\n`, err)
  }
}
const getMe = async accessToken => fetch('/me', accessToken)
const getMyTopArtists = async accessToken => fetch('/me/top/artists', accessToken)
  .then(data => data.items)
const getMyTopTracks = async accessToken => fetch('/me/top/tracks', accessToken)
  .then(data => data.items)

app.use(cookieParser())
app.use('/graphql', graphqlHTTP(req => {
  // TODO: move to POST
  const accessToken = req.body && req.body.jwt
  ? req.body.jwt.access_token
  : 'BQAqh4ewepqdRGRXIMjqzCu-QSdgF8PgkAO3IBEop3fJPE9gJfMZ4QAWVTBC3ud4mgtJoNq7L5wXzsYTH6WDD5BbqS2pbSYr9EzT4-_kkesGFB7dOcB4GvvzwN7pxy8Av95GxBbnqq49arLmoNMnoU9AtNi241iqZZSU'

  return {
    schema,
    context: {
      accessToken,
      // ... loaders
      service: {
        getMe,
        getMyTopArtists,
        getMyTopTracks
      }
    },
    graphiql: true
  }
}))

app.get('/healthz', (req, res) => res.send('Oooh weee look at me!'))

var CLIENT_ID = '32bc902bd0ef426e9ad9630a9a9b5c3e' // Your client id
var CLIENT_SECRET = '72f5288d2565447e9f6bbf886278c42d' // Your secret
var REDIRECT_URI = 'http://localhost:4000/callback' // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
};

const STATE_KEY = 'spotimix_auth_state'
app.get('/login', (req, res) => {
  const state = generateRandomString(16)
  res.cookie(STATE_KEY, state)

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-top-read'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    }))
})

app.get('/callback', async (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null

  if (state === null || state !== storedState) {
    res.redirect(process.env.APP_HOST + '?' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(STATE_KEY)
    const URL = 'https://accounts.spotify.com/api/token'
    const DATA = {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }

    try {
      const authRes = await axios.post(URL, querystring.stringify(DATA), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        }
      })
      if (authRes.status === 200) {
        const body = authRes.data
        logger.info(body)
        res.redirect(process.env.APP_HOST + '?' +
         querystring.stringify({
           jwt: jwt.sign(body, process.env.JWT_SECRET)
         }))
      } else {
        res.redirect(process.env.APP_HOST + '?' +
          querystring.stringify({
            error: 'invalid_token'
          }))
      }
    } catch (err) {
      logger.error('Error requesting api token from Spotify:\n', err)
    }
  }
})

module.exports = app
