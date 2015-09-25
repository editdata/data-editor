var DataEditor = require('../index')

var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var state = {
  view: 'map'
}

var mapView = require('../map')({
  leaflet: {
    zoom: 12,
    center: [47.645, -122.333],
    accessToken: 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
  }
})

render(state)

mapView.addEventListener('load', function () {

})

function render (state) {
  var view
  if (state.view === 'map') {
    view = mapView.render(state)
  } else if (state.view === 'table') {
    // render tableView
  }
  editor.render([view], state)
}
