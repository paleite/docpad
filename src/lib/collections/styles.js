# =====================================
# Requires

# External
typeChecker = require('typechecker')

# Local
ElementsCollection = require('./elements')


# =====================================
# Classes

###*
# Styles collection class. A DocPad
# project's style (css) file paths
# @class StylesCollection
# @constructor
# @extends ElementsCollection
###
class StylesCollection extends ElementsCollection

	###*
	# Add an element to the collection
	# Right now we just support strings
	# @method add
	# @param {Array} values string array of file paths
	# @param {Object} opts
	###
	add: (values,opts) ->
		# Prepare
		opts or= {}
		opts.attrs or= ''

		# Ensure array
		if typeChecker.isArray(values)
			values = values.slice()
		else if values
			values = [values]
		else
			values = []

		# Convert urls into script element html
		for value,key in values
			if typeChecker.isString(value)
				if value[0] is '<'
					continue  # we are an element already, don't bother doing anything
				else if value.indexOf(' ') is -1
					# we are a url
					values[key] = """
						<link #{opts.attrs} rel="stylesheet" href="#{value}" />
						"""
				else
					# we are inline
					values[key] = """
						<style #{opts.attrs}>#{value}</style>
						"""

		# Call the super with our values
		super(values, opts)


# =====================================
# Export
module.exports = StylesCollection
