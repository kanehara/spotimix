const express = require('express')
const router = express.Router()
const logger = require('../logger')
const querystring = require('querystring')
const axios = require('axios')
const config = require('../config')

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

const STATE_KEY = 'mixceed_auth_state'
const ACCESS_TOKEN_COOKIE_KEY = 'spotify_access_token'
const REFRESH_TOKEN_COOKIE_KEY = 'spotify_refresh_token'

router.get('/login', (req, res) => {
  const state = generateRandomString(16)
  res.cookie(STATE_KEY, state)

  // your application requests authorization
  const scope = 'user-modify-playback-state streaming'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: config.SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: config.SPOTIFY_REDIRECT_URI,
      state: state
    }))
})

router.get('/callback', async (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null

  if (state === null || state !== storedState) {
    res.redirect(config.APP_HOST + '/#/results?' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(STATE_KEY)
    try {
      const authRes = await generateShopifyToken({
        code: code,
        redirect_uri: config.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code'
      })
      if (authRes.status === 200) {
        const body = authRes.data
        res.cookie(ACCESS_TOKEN_COOKIE_KEY, body.access_token)
        res.cookie(REFRESH_TOKEN_COOKIE_KEY, body.refresh_token)
        res.redirect(config.APP_HOST + '/#/results')
      } else {
        res.redirect(config.APP_HOST + '/#/results?' +
          querystring.stringify({
            error: 'invalid_token'
          }))
      }
    } catch (err) {
      logger.error('Error requesting api token from Spotify:\n', err)
    }
  }
})

const generateShopifyToken = async (data) => {
  const URL = 'https://accounts.spotify.com/api/token'
  return axios.post(URL, querystring.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(config.SPOTIFY_CLIENT_ID + ':' + config.SPOTIFY_CLIENT_SECRET).toString('base64')}`
    }
  })
}

router.put('/refresh_token', async (req, res) => {
  const accessToken = req.cookies ? req.cookies[ACCESS_TOKEN_COOKIE_KEY] : null
  const refreshToken = req.cookies ? req.cookies[REFRESH_TOKEN_COOKIE_KEY] : null
  if (!accessToken || !refreshToken) {
    res.sendStatus(401)
    return
  }

  let authRes
  try {
    authRes = await generateShopifyToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  } catch (e) {
    logger.error('Error requesting Shopify refresh token:\n', e.message, e.response && e.response.data)
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY)
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY)
    res.sendStatus(440)
    return
  }
  if (authRes.status === 200) {
    const body = authRes.data
    const refreshedAccessToken = body.access_token
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, refreshedAccessToken)
    if (body.refresh_token) {
      res.cookie(REFRESH_TOKEN_COOKIE_KEY, body.refresh_token)
    }
    res.send({
      access_token: refreshedAccessToken
    })
  } else {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY)
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY)
    logger.error('Unexpected status refreshing token:\n', authRes.status)
    res.sendStatus(authRes.status)
  }
})

const spotifyMiddleware = async (req, res, next) => {
  const accessToken = req.cookies ? req.cookies[ACCESS_TOKEN_COOKIE_KEY] : null
  const refreshToken = req.cookies ? req.cookies[REFRESH_TOKEN_COOKIE_KEY] : null
  if (!accessToken || !refreshToken) {
    res.sendStatus(401)
    return
  }

  let authRes
  try {
    authRes = await generateShopifyToken({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  } catch (e) {
    logger.error('Error requesting Shopify refresh token:\n', e.message, e.response && e.response.data)
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY)
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY)
    res.sendStatus(440)
    return
  }
  if (authRes.status === 200) {
    const refreshedAccessToken = authRes.data.access_token
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, refreshedAccessToken)
    if (authRes.data.refresh_token) {
      res.cookie(REFRESH_TOKEN_COOKIE_KEY, authRes.data.refresh_token)
    }
    req.shopifyAccessToken = refreshedAccessToken
    next()
  } else {
    res.status(authRes.status)
  }
}

router.put('/play', spotifyMiddleware, async (req, res) => {
  const uris = req.body && req.body.uris
  if (!uris || !uris.length) {
    res.status(400).send('missing uris to play')
    return
  }
  const deviceId = req.body && req.body.deviceId
  if (!deviceId) {
    res.status(400).send('missing device id')
    return
  }

  axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    uris
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.shopifyAccessToken}`
    }
  }).then((playRes) => {
    if (playRes.state < 200 || playRes.status > 299) {
      logger.error('Received non-2XX response trying to play tracks in Shopify:\n', playRes.status)
      res.sendStatus(playRes.status)
    } else {
      res.sendStatus(200)
    }
  }).catch(e => {
    logger.error('Error trying to play tracks in Shopify:\n', e.message, e.response && e.response.data)
    res.sendStatus((e.response && e.response.status) || 500)
  })
})

router.put('/transfer', spotifyMiddleware, async (req, res) => {
  const deviceId = req.body && req.body.deviceId
  if (!deviceId) {
    res.status(400).send('missing deviceId')
    return
  }

  axios.put('https://api.spotify.com/v1/me/player', {
    device_ids: [deviceId]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.shopifyAccessToken}`
    }
  }).then(() => {
    res.sendStatus(200)
  }).catch(e => {
    logger.error('Error trying to transfer playback:\n', e.message, e.response && e.response.data)
    res.sendStatus((e.response && e.response.status) || 500)
  })
})

module.exports = router
