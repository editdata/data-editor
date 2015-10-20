var BaseElement = require('base-element')
var inherits = require('inherits')

var formatter = require('data-format')()
var createHeader = require('./header')

module.exports = DataCard
inherits(DataCard, BaseElement)

function DataCard (options) {
  if (!(this instanceof DataCard)) return new DataCard(options)
  options = options || {}
  BaseElement.call(this, options.el)
  var self = this
  this.header = options.header || createHeader()
  this.header.addEventListener('close', function (e) {
    self.send('close', e)
  })
  this.header.addEventListener('row:destroy', function (row) {
    self.send('row:destroy', row)
  })
}

DataCard.prototype.render = function (state) {
  if (!state.activeRow) return
  var h = this.html
  var fields = []
  var columns = state.activeRow.data.value

  Object.keys(columns).forEach(function (key) {
    var property = formatter.findProperty(state.properties, key)
    var value = columns[key]
    var type = property.type[0]
    if (type === 'string') {
      var el = 'textarea#data-card-field-' + key + '.data-card-field.data-element-string'
      var field = h(el, {
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
      this.header.render(state),
      this.html('div.data-card-fields', fields)
    ])
  ])
  return this.afterRender(vtree)
}
