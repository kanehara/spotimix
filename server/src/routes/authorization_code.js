const express = require('express')
const router = express.Router()
const logger = require('../logger')
const querystring = require('querystring')
const axios = require('axios')
const jwt = require('jsonwebtoken')

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
router.get('/login', (req, res) => {
  const state = generateRandomString(16)
  res.cookie(STATE_KEY, state)

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-top-read'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
      state: state
    }))
})

router.get('/callback', async (req, res) => {
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
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    }

    try {
      const authRes = await axios.post(URL, querystring.stringify(DATA), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`
        }
      })
      if (authRes.status === 200) {
        const body = authRes.data
        logger.info(body)

        // TODO: handle jwt token on client on user scoped permissions (e.g. save playlist)
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

module.exports = router
