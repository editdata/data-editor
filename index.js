var emitter = require('component-emitter')

module.exports = function createEditor (options) {
  var editor = {}
  emitter(editor)

  editor.format = require('./lib/format')(options)
  editor.rows = require('./lib/rows')(options)
  editor.properties = require('./lib/properties')(options)
  editor.metadata = require('./lib/metadata')(options)

  editor.init = function editor_init (dataset) {
    return editor.format.init(dataset)
  }

  editor.reset = function editor_reset () {
    return { data: [], properties: {}, metadata: editor.format.initMetadata() }
  }

  editor.toNameFormat = function editor_toNameFormat (dataset) {

  }

  editor.toGeoJSON = function editor_toGeoJSON (dataset) {

  }

  return editor
}
