var h = require('virtual-dom/h')
var DataEditor = require('../../index')
var formatter = require('data-format')()
var mapView = require('data-map')({
  zoom: 16,
  center: [47.623144843796936, -122.3362612724304],
  accessToken: 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
})

var data = require('./data.json')
var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var formatted = formatter.format(data)
var state = window.state = {
  properties: formatted.properties,
  data: formatted.data,
  geojson: {
    type: 'FeatureCollection',
    features: formatter.toGeoJSON(formatted, {
      convertToNames: false
    })
  }
}

mapView.addEventListener('load', function () {
  render(state)
})

mapView.addEventListener('click:layer', function (e) {
  console.log('clicked layer', e)
})

function render (state) {
  var view = mapView.render(state)
  editor.render([h('div.view-wrapper', [view])], state)
}

render(state)
