var emitter = require('component-emitter')

module.exports = function createEditor (options) {
  var editor = {}
  emitter(editor)

  editor.format = require('./lib/format')(editor, options)
  editor.rows = require('./lib/rows')(editor, options)
  editor.properties = require('./lib/properties')(editor, options)
  editor.metadata = require('./lib/metadata')(editor, options)

  editor.format = function editor_format (dataset) {
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
