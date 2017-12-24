process.env.NODE_ENV == 'production'
const path = require('path')
const express = require('express')
const app = express()

// serve statics
app.use(express.static(path.join(__dirname, 'dist')));
// serve index
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
// start server
app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port 8080');
});
