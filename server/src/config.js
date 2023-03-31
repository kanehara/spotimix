const HOST = process.env.HOST || 'http://localhost:4000'

module.exports = {
  HOST,
  APP_HOST: process.env.APP_HOST || 'http://localhost:8080',
  JWT_SECRET: process.env.JWT_SECRET || 'strawberry-smiggles',
  SPOTIFY_API_HOST: 'https://api.spotify.com',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI: `${HOST}/api/callback`
}
