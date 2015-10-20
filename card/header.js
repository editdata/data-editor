var BaseElement = require('base-element')
var inherits = require('inherits')

module.exports = CardHeader
inherits(CardHeader, BaseElement)

function CardHeader () {
  if (!(this instanceof CardHeader)) return new CardHeader()
  BaseElement.call(this)
}

CardHeader.prototype.render = function (state) {
  var self = this
  var vtree = this.html('div#data-card-header', [
    this.html('div.data-card-actions', [
      this.html('button.data-card-action.data-card-action-close.button', {
        href: '#',
        onclick: function (e) {
          self.send('close', e)
        }
      }, 'close')
    ])
  ])
  return this.afterRender(vtree)
}

/*
destroy button

,
this.html('button#destroyRow.small.button-orange', {
  onclick: function (e) {
    self.send('row:destroy', state.activeRow.data)
  }
}, 'destroy row')
])
*/
