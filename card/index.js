var BaseElement = require('base-element')
var inherits = require('inherits')
var createHeader = require('./header')

module.exports = DataCard
inherits(DataCard, BaseElement)

function DataCard (options) {
  if (!(this instanceof DataCard)) return new DataCard(options)
  BaseElement.call(this, options.el)
  var self = this
}

DataCard.prototype.render = function (state) {
  if (!state.activeRow) return
  var vtree = this.html('div#data-card-container', this, [
    this.html('div#data-card')
  ])
  return this.afterRender(vtree)
}
