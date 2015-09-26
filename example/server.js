var http = require('http')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer({})
var Corsify = require('corsify')
 
var cors = Corsify({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
})

http.createServer(cors(function (req, res) {
  proxy.web(req, res, { target: 'http://dev-api.heyduwamish.org/api/v2/' })
})).listen(4242)
