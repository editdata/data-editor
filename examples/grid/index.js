var h = require('virtual-dom/h')
var DataEditor = require('../../index')
var formatter = require('data-format')()
var gridView = require('data-grid')()
var dataForm = require('data-form')()
var data = require('./data.json')
var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var formatted = formatter.format(data)
var state = window.state = {
  properties: formatted.properties,
  data: formatted.data,
  geojson: {
    features: formatter.toGeoJSON(formatted, { convertToNames: false })
  },
  activeRow: null
}

dataForm.addEventListener('close', function (e) {
  state.activeRow = null
  render(state)
})

dataForm.addEventListener('row:destroy', function (e) {

})

gridView.addEventListener('click', function (e, row, key, value) {
  state.activeRow = {
    data: row,
    element: e.target
  }
  render(state)
  document.querySelector('#data-form-field-' + key).focus()
})

function render (state) {
  var elements = []
  var viewWrapper = 'div.view-wrapper'
  viewWrapper += state.activeRow ? '.card-open' : '.card-closed'
  elements.push(h(viewWrapper, [gridView.render(state)]))
  if (state.activeRow) elements.push(dataForm.render(state))
  editor.render(elements, state)
}

render(state)
