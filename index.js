var csvWriter = require('csv-write-stream')
var BaseElement = require('base-element')
var formatData = require('data-format')()
var fromArray = require('from2-array')
var through = require('through2')
var inherits = require('inherits')
var extend = require('extend')
var cuid = require('cuid')
var from = require('from2')

module.exports = Editor
inherits(Editor, BaseElement)

function Editor (el, options) {
  if (!(this instanceof Editor)) return new Editor(el, options)
  BaseElement.call(this, el)
  this.state = {
    properties: {},
    data: [],
    metadata: {
      title: options.title,
      description: options.description,
      source: options.source,
      url: options.url
    },
    _activeRow: null
  }
}

Editor.prototype.render = function (elements, state) {
  var vtree = this.html('div#editor-inner', elements)
  return this.afterRender(vtree)
}

Editor.prototype.renderView = function (view, state) {
  this.render([view(state)], state)
}

Editor.prototype.write = function (item) {
  this.state.data.push(item)
  this.render(this.state)
}

Editor.prototype.export = function (options, callback) {
  if (options.format === 'json') {
    this.exportCSV(options, callback)
  } else if (options.format === 'csv') {
    this.exportJSON(options, callback)
  }
}

Editor.prototype.exportCSV = function (options, callback) {
  var csv = ''
  var writer = csvWriter({ headers: this.getPropertyNames() })
  fromArray.obj(this.state.data)
    .pipe(through.obj(function (chunk, enc, next) {
      this.push(chunk)
      next()
    }))
    .pipe(writer)
    .on('data', function (data) {
      csv += data
    })
    .on('end', function () {
      callback(null, csv)
    })
}

Editor.prototype.exportJSON = function (options, callback) {
  var self = this
  var data = []

  if (!callback) {
    callback = options
    options = {}
  }

  from.obj(this.state.data)
    .pipe(through.obj(function (row, enc, next) {
      row = self.convertToNames(row)
      data.push(row)
      next()
    }))
    .on('end', function () {
      callback(null, data)
    })
}

Editor.prototype.metadata = function (options) {
  if (options) {
    this.state.metadata = extend(this.state.metadata, options)
  }
  return this.state.metadata
}

Editor.prototype.reset = function (state) {
  this.data = state.data = []
  this.properties = state.properties = {}
  return state
}

/*
* Properties
*/
Editor.prototype.addProperty = function (property) {
  if (!property.key) property.key = this.createPropertyKey()
  if (!property.type) property.type = ['string', 'null']
  if (!property.default) property.default = null

  var prop = formatData.createProperty(property)
  this.properties[prop.key] = prop

  this.state.data.forEach(function (item) {
    item.value[property.key] = null
  })
}

Editor.prototype.getProperty = function (id) {
  return formatData.findProperty(this.properties, id)
}

Editor.prototype.updateProperty = function (id, options) {
  return formatData.updateProperty(this.properties, id, options)
}

Editor.prototype.removeProperty = function (id) {
  formatData.removeProperty(this.properties, id)
}

Editor.prototype.setPropertyName = function (key, name) {
  this.updateProperty(key, { name: name })
}

Editor.prototype.setPropertyType = function (key, type) {
  this.updateProperty(key, { type: type })
}

Editor.prototype.getPropertyNames = function () {
  var names = []
  Object.keys(this.properties).forEach(function (key) {
    names.push(this.properties[key].name)
  })
  return names
}

/*
* Rows
*/
Editor.prototype.addRow = function (row) {
  var rowkey

  if (row.key && row.value) {
    rowkey = row.key
    value = row.value
  } else if (row) {
    rowkey = this.createRowKey()
  }

  var value = this.formatRow(row)
  this.write({ key: rowkey, value: value })
}

Editor.prototype.getRow = function (key) {
  return this.state.data.find(function (row) {
    return row.key === key
  })
}

Editor.prototype.updateRow = function (key, options) {
  var row = this.getRow(key)
  options = formatData.convertToKeys(this.properties, options)
  row = extend(row, options)
  this.state.data[row.key] = row
}

Editor.prototype.removeRow = function (key) {
  if (typeof key === 'object' && key.key) key = key.key
  this.state.data = this.state.data.filter(function (row) {
    return row.key !== key
  })
}

Editor.prototype.activeRow = function (row) {
  if (row) return this.setActiveRow(row)
  else return this.getActiveRow()
}

Editor.prototype.setActiveRow = function (row) {
  this._activeRow = row
  return this._activeRow
}

Editor.prototype.getActiveRow = function () {
  return this._activeRow
}

Editor.prototype.convertRowToKeys = function (row) {
  return formatData.convertToKeys(this.properties, row)
}

Editor.prototype.convertRowToNames = function (row) {
  return formatData.convertToNames(this.properties, row)
}

Editor.prototype.validateRow = function (prop, value) {
  return formatData(this.properties, prop, value)
}

/*
* Modals
*/
Editor.prototype.openModal = function (options) {

}

Editor.prototype.expandModal = function (options) {

}

Editor.prototype.shrinkModal = function (row, callback) {

}

Editor.prototype.closeModal = function (options) {

}

Editor.prototype.isModalActive = function (options) {

}

Editor.prototype.isModalExpanded = function (options) {

}

/*
* Keys
*/
Editor.prototype.createRowKey = function () {
  return 'row-' + cuid()
}

Editor.prototype.createCellKey = function () {
  return 'cell-' + cuid()
}

Editor.prototype.createPropertyKey = function () {
  return 'property-' + cuid()
}
