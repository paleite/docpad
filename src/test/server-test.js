# =====================================
# Requires

# Standard Library
pathUtil = require('path')

# External
{equal} = require('assert-helpers')
joe = require('joe')
superagent = require('superagent')

# Local
docpadUtil = require('../lib/util')


# =====================================
# Configuration

# Paths
docpadPath = pathUtil.join(__dirname, '..', '..')
rootPath   = pathUtil.join(docpadPath, 'test')
renderPath = pathUtil.join(rootPath, 'render')
expectPath = pathUtil.join(rootPath, 'render-expected')
cliPath    = pathUtil.join(docpadPath, 'bin', 'docpad')

# Fail on an uncaught error
process.on 'uncaughtException', (err) ->
	throw err


# -------------------------------------
# Tests

joe.suite 'docpad-custom-server', (suite,test) ->
	# Local Globals
	docpadConfig = null
	docpad = null
	serverExpress = null
	serverHttp = null
	port = null

	# Create a DocPad Instance
	test 'createInstance', (done) ->
		docpadConfig =
			port: port = 9780
			rootPath: rootPath
			logLevel: docpadUtil.getDefaultLogLevel()
			skipUnsupportedPlugins: false
			catchExceptions: false
			serverExpress: serverExpress = require('express')()
			serverHttp: serverHttp = require('http').createServer(serverExpress).listen(port)
		serverExpress.get '/hello', (req,res) ->
			res.send(200, 'hello world')
		docpad = require('../lib/docpad').createInstance(docpadConfig, done)

	# Run Server Action
	test 'server action', (done) ->
		docpad.action('server', done)

	# Test Server Binding
	test 'server bound', (done) ->
		equal(
			docpad.serverExpress
			serverExpress
			"serverExpress was bound"
		)
		equal(
			docpad.serverHttp
			serverHttp
			"serverHttp was bound"
		)
		superagent.get("http://127.0.0.1:#{port}/hello")
			.timeout(5*1000)
			.end (err, res) ->
				equal(err, null, "no error")
				equal(
					res.text
					'hello world'
					"server was extended correctly"
				)
				done()

	# Destroy
	test 'destroy instance', (done) ->
		docpad.destroy(done)
