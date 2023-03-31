process.env.NODE_ENV == 'production'
const PORT = process.env.PORT || 8080
const path = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware')
const app = express()

// serve statics
app.use(express.static(path.join(__dirname, 'dist')));
// server proxy
app.use('/api/*', proxy({
  target: 'http://server:4000', // proxies to dockerized server container
  pathRewrite: {
    '^/api': ''
  }
}));
// serve index
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
// start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`==> Listening on port ${PORT}`);
});
