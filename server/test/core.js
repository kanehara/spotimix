const request = require('supertest')
const app = require('../src/app')

module.exports = test => {
  test('healthz check', t => {
    request(app)
      .get('/healthz')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        const expectedBody = 'Oooh weee look at me!'
        const actualBody = res.text
        t.error(err, 'No error')
        t.equal(actualBody, expectedBody, 'Healthz check')
        t.end()
      })
  })

  test('404 on nonexistant URL', (t) => {
    request(app)
      .get('/GETShouldFailOnRandomURL')
      .expect(404)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        t.error(err, 'No error')
        t.notEqual(res.text.indexOf('Cannot GET /GETShouldFailOnRandomURL'), -1)
        t.end()
      })
  })
}
