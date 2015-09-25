var BaseElement = require('base-element')
var inherits = require('inherits')
var L = require('leaflet')
require('mapbox.js')

module.exports = DataMap
inherits(DataMap, BaseElement)

function DataMap (options) {
  if (!(this instanceof DataMap)) return new DataMap(options)
  BaseElement.call(this, options.el)
  var self = this

  this.addEventListener('load', function (node, a, b) {
    var mapEl = node.childNodes[0]
    self.map = L.mapbox.map(mapEl, 'mapbox.streets', options.leaflet)

    self.map.on('click', function (e) {
      console.log('maaaaaap', e)
    })

    self.markers = L.mapbox.featureLayer().addTo(self.map)
  })
}

DataMap.prototype.render = function (state) {
  if (this.markers) this.markers.setGeoJSON(state.geojson)
  var vtree = this.html('div#map-container', this, [
    this.html('div#map')
  ])
  return this.afterRender(vtree)
}
