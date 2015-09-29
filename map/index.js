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
  options.tiles = options.tiles || 'mapbox.streets'
  this.addEventListener('load', function (node) {
    var mapEl = node.childNodes[0]
    L.mapbox.accessToken = options.leaflet.accessToken
    options.leaflet.popupOptions = null
    self.map = L.mapbox.map(mapEl, options.tiles, options.leaflet)
    self.geojson = L.mapbox.featureLayer().addTo(self.map)
  })
}

DataMap.prototype.setGeoJSON = function (geojson) {
  this.geojson.setGeoJSON(geojson)
}

DataMap.prototype.render = function (state) {
  if (this.geojson && state.geojson) this.setGeoJSON(state.geojson)
  var vtree = this.html('div#map-container', this, [
    this.html('div#map')
  ])
  return this.afterRender(vtree)
}
