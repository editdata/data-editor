# data-editor

## usage

```
var dataEditor = require('data-editor')
var editor = dataEditor(document.getElementById('editor'), {
  views: {
    map: require('data-editor/map'),
    list: require('data-editor/list'),
    table: require('data-editor/table')
  }
})

var state = {
  properties: {},
  data: [
    {
      key: 'uuid',
      value: {
        pizza: true,
        awesome: 'this string is awesome',
        howManyPizzas: 27,
        thisisGeoJSON: {
          // whatever geojson looks like who knows right
        }
      }
    }
  ]
} 

editor.render(state)

editor.addEventListener('load', function () {

})

editor.addEventListener('render', function () {

})

editor.addEventListener('update', function (cell, row) {
  console.log(cell.el, cell.data, cell.property)
  console.log(row.el, row.data)
})

editor.addEventListener('focus', function (cell, row) {
  editor.open(row)
})

editor.addEventListener('property:add', function (e, property) {

})

editor.addEventListener('property:update', function (e, property) {

})

editor.addEventListener('property:remove', function (e, property) {

})

editor.addEventListener('row:add', function (e, property) {

})

editor.addEventListener('row:update', function (e, property) {

})

editor.addEventListener('row:remove', function (e, property) {

})

editor.addEventListener('row:active', function (row) {
  console.log(row.el, row.data)
})

editor.addEventListener('card:open', function (e) {

})

editor.addEventListener('card:expand', function (e) {

})

editor.addEventListener('card:close', function (e) {

})
```

