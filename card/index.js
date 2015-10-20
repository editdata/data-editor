var BaseElement = require('base-element')
var inherits = require('inherits')

var formatter = require('data-format')()
var createHeader = require('./header')

module.exports = DataCard
inherits(DataCard, BaseElement)

function DataCard (el) {
  if (!(this instanceof DataCard)) return new DataCard(el)
  BaseElement.call(this, el)
}

DataCard.prototype.render = function (state) {
  if (!state.activeRow) return
  var h = this.html
  var fields = []
  var props = state.properties
  var columns = state.activeRow.data.value

  Object.keys(columns).forEach(function (key) {
    var property = formatter.findProperty(state.properties, key)
    var value = columns[key]
    var type = property.type[0]
    if (type === 'string') {
      var field = h('textarea.data-card-field.data-element-string', {
        value: value
      }, value)
    }
    var label = h('label.data-card-label', property.name)
    var wrapper = h('div.data-card-field-wrapper', [
      label,
      field
    ])
    fields.push(wrapper)
  })
  
  var vtree = this.html('div#data-card-wrapper', [
    this.html('div#data-card', [
      this.html('div.data-card-fields', fields)
    ])
  ])
  return this.afterRender(vtree)
}
