var test = require('tape')
var format = require('../lib/format')()

test('format an array of objects', function (t) {
  var data = require('./fixtures/example.json')
  var dataset = format.init(data)
  t.ok(dataset)
  t.equal(Object.keys(dataset.properties).length, 9)
  t.equal(dataset.data.length, 8)
  t.end()
})
