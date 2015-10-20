var BaseElement = require('base-element')
var inherits = require('inherits')

module.exports = CardHeader
inherits(CardHeader, BaseElement)

function CardHeader () {
  if (!(this instanceof CardHeader)) return new CardHeader()
  BaseElement.call(this)
}

CardHeader.prototype.render = function (state) {
  var vtree = this.html('div#data-card-header', [])
  return this.afterRender(vtree)
}
