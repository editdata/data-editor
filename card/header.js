var BaseElement = require('base-element')
var inherits = require('inherits')

module.exports = CardHeader
inherits(CardHeader, BaseElement)

function CardHeader (options) {
  if (!(this instanceof CardHeader)) return new CardHeader(options)
  BaseElement.call(this, options.el)
  var self = this
}

CardHeader.prototype.render = function (state) {
  var vtree = this.html('div#data-card-header', [])
  return this.afterRender(vtree)
}
