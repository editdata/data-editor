var ViewList = require('view-list')
var dataset = require('data-set')
var extend = require('extend')

module.exports = function rowsView (opts) {
  var options = extend({
    className: 'data-table-rows',
    rowHeight: 40,
    eachrow: rows,
    editable: true,
    properties: {},
    height: 643
  }, opts)

  var list = ViewList(options)

  function rows (row) {
    if (row.id && !row.key) row.key = row.id
    if (!row.value) row.value = row.properties
    var properties = Object.keys(row.value)
    var elements = properties.map(element)

    function element (key) {
      function getProperty (target) {
        var property = {}
        var ds = dataset(target)
        property[ds.key] = value(target)
        return property
      }

      function onfocus (e) {
        var property = getProperty(e.target)
        list.send('focus', e, property, row)
      }

      function onblur (e) {
        var property = getProperty(e.target)
        list.send('blur', e, property, row)
      }

      function onclick (e) {
        list.send('click', e, row, key, row.value[key])
      }

      var propertyOptions = {
        id: 'cell-' + row.key + '-' + key,
        attributes: {
          'data-type': 'string', // todo: use property type from options.properties
          'data-key': key
        },
        onfocus: onfocus,
        onblur: onblur,
        onclick: onclick
      }

      var value
      if (typeof row.value[key] === 'object') value = null
      else if (typeof row.value[key] === 'number') value = '' + row.value[key]
      else if (typeof row.value[key] === 'boolean') value = row.value[key].toString()
      else value = row.value[key]

      return list.html('li.list-property', [
        list.html('span.list-property-value', propertyOptions, value)
      ])
    }

    var rowOptions = { attributes: { 'data-key': row.key } }

    if (row.active) {
      rowOptions.className = 'active'
      rowOptions.attributes['data-active'] = 'true'
    }

    return list.html('li.list-row', rowOptions, [
      list.html('ul.list-properties', elements)
    ])
  }

  return list
}
