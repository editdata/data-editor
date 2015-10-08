var h = require('virtual-dom/h')
var DataEditor = require('../../index')
var formatter = require('data-format')()
var gridView = require('data-grid')()
var data = require('./data.json')
var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var formatted = formatter.format(data)
var state = window.state = {
  properties: formatted.properties,
  data: formatted.data,
  geojson: {
    features: formatter.toGeoJSON(formatted, { convertToNames: false })
  }
}

gridView.addEventListener('click', function (e, row, key, value) {
  console.log(e, row, key, value)
})

function render (state) {
  var view = gridView.render(state)
  editor.render([h('div.view-wrapper', [view])], state)
}

render(state)
