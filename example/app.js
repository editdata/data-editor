var request = require('xhr')
var DataEditor = require('../index')
var formatter = require('data-format')()

var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var state = window.state = {
  view: 'map',
  properties: {},
  data: []
}

var tableView = require('../table')()

var mapView = require('../map')({
  leaflet: {
    zoom: 12,
    center: [47.545, -122.336],
    accessToken: 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
  }
})

mapView.addEventListener('load', function () {
  getPlaces(function (err, body) {
    if (err) console.error(err)

    state.data = formatter.format(body.features)
    state.geojson = {
      features: formatter.toGeoJSON(state.data, { convertToNames: false })
    }

    render(state)
  })
})

render(state)

function render (state) {
  var view
  if (state.view === 'map') {
    view = mapView.render(state)
  } else if (state.view === 'table') {
    view = tableView.render(state.data)
  }
  editor.render([view], state)
}

function getPlaces (callback) {
  request({
    url: 'http://127.0.0.1:4242/smartercleanup/datasets/duwamish/places?format=json',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }, function (err, res, body) {
    if (err) return callback(err)
    if (res.statusCode >= 400) return callback(body)
    return callback(null, JSON.parse(body))
  })
}

document.getElementById('toggle').addEventListener('click', function (e) {
  e.preventDefault()
  if (state.view === 'map') {
    state.view = 'table'
  } else {
    state.view = 'map'
  }
  render(state)
})
