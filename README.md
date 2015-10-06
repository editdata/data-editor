# data-editor

## usage

```
var dataEditor = require('data-editor')
var editor = dataEditor(document.getElementById('editor'))

var mapView = require('data-editor/map')()
var listView = require('data-editor/list')()
var tableView = require('data-editor/table')()

var state = {
  properties: {},
  data: [
    {
      key: 'uuid',
      value: {
        pizza: true,
        awesome: 'this string is awesome',
        howManyPizzas: 27
      }
    }
  ]
} 

editor.render(state)

editor.addEventListener('load', function () {

})

editor.addEventListener('render', function () {

})

editor.addEventListener('property:add', function (property) {

})

editor.addEventListener('property:update', function (property) {

})

editor.addEventListener('property:remove', function (key) {

})

editor.addEventListener('row:add', function (row) {

})

editor.addEventListener('row:update', function (row) {

})

editor.addEventListener('row:remove', function (key) {

})

editor.addEventListener('row:active', function (row) {
  console.log(row)
})
```

