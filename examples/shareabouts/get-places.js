var fs = require('fs')
var request = require('request')

request({
  url: 'http://dev-api.heyduwamish.org:8010/api/v2/smartercleanup/datasets/duwamish/places?format=json',
  method: 'GET',
  headers: { 'Content-Type': 'application/json'}
}, function (err, res, body) {
  if (err) return callback(err)
  if (res.statusCode >= 400) return callback(body)
  console.log(body)
})