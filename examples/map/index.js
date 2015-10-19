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

var editor = DataEditor(appEl, state)

mapView.addEventListener('load', function () {
  render(state)
})

mapView.addEventListener('click', function (e, feature, layer) {
  var row = editor.getRow(feature.id)
  console.log('row', row)
})

function render (state) {
  var elements = []
  var view = mapView.render(state)
  elements.push(h('div.view-wrapper', [view])
  if (state.activeRow) {
    elements.push([])
  }
  editor.render(elements, state)
}

render(state)
