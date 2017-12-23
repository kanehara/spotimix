const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const app = express()
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const cors = require('cors')
const logger = require('./logger')
const initRoutes = require('./routes')

app.use(cookieParser())
app.use(cors())

// TODO: Move loaders to own module
const fetch = async (path, accessToken) => {
  try {
    const res = await axios.get(`${process.env.API_HOST}/v1${path}`, {
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
const getRecommendations = async (accessToken, params) => fetch(`/recommendations?${querystring.stringify(params)}`, accessToken)
const search = async (accessToken, params) => fetch(`/search?${querystring.stringify(params)}`, accessToken)
const getGenres = async accessToken => fetch(`/recommendations/available-genre-seeds`, accessToken)
  .then(data => data.genres)

let CLIENT_CRED_TOKEN = null

async function fetchClientCredentialsToken () {
  return axios
    .post('https://accounts.spotify.com/api/token',
      querystring.stringify({grant_type: 'client_credentials'}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`
        }
      })
}

function setTokenRefreshTimeout (timeout) {
  setTimeout(async () => {
    const res = await fetchClientCredentialsToken()
    CLIENT_CRED_TOKEN = res.status === 200 && res.data.access_token
      ? res.data.access_token
      : null
    const refreshTimeout = res.data.expires_in ? (Number(res.data.expires_in) - 60) * 1000 : 0
    setTokenRefreshTimeout(refreshTimeout)
  }, timeout)
}

async function getClientCredentialsToken () {
  if (CLIENT_CRED_TOKEN) {
    return CLIENT_CRED_TOKEN
  }
  const res = await fetchClientCredentialsToken()
  CLIENT_CRED_TOKEN = res.status === 200 && res.data.access_token ? res.data.access_token : null
  const refreshTimeout = res.data.expires_in ? (Number(res.data.expires_in) - 60) * 1000 : 0
  setTokenRefreshTimeout(refreshTimeout)
  return CLIENT_CRED_TOKEN
}

app.use('/graphql', graphqlHTTP(async req => {
  const accessToken = await getClientCredentialsToken()
  return {
    schema,
    context: {
      accessToken,
      // ... loaders
      services: {
        getMe,
        getMyTopArtists,
        getMyTopTracks,
        getRecommendations,
        getGenres,
        search
      },
      req
    },
    graphiql: true
  }
}))

app.get('/healthz', (req, res) => res.send('Oooh weee look at me!'))
initRoutes(app)

module.exports = app
