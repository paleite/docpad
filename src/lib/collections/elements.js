/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// =====================================
// Requires

// External
const typeChecker = require('typechecker');

// Local
const {Collection,Model} = require('../base');


// =====================================
// Classes

/**
 * Base class for the DocPad Elements Collection object
 * Extends the DocPad collection class
 * https://github.com/docpad/docpad/blob/master/src/lib/base.coffee#L72
 * Used as the base collection class for specific collection of file types.
 * In particular metadata, scripts and styles.
 * @class ElementsCollection
 * @constructor
 * @extends Collection
 */
class ElementsCollection extends Collection {
	static initClass() {
	
		/**
		 * Base Model for all items in this collection
		 * @property {Object} model
		 */
		this.prototype.model = Model;
	}

	/**
	 * Add an element to the collection.
	 * Right now we just support strings.
	 * @method add
	 * @param {Array} values string array of values
	 * @param {Object} opts
	 */
	add(values,opts) {
		// Ensure array
		if (typeChecker.isArray(values)) {
			values = values.slice();
		} else if (values) {
			values = [values];
		} else {
			values = [];
		}

		// Convert string based array properties into html
		for (let key = 0; key < values.length; key++) {
			const value = values[key];
			if (typeChecker.isString(value)) {
				values[key] = new Model({html:value});
			}
		}

		// Call the super with our values
		super.add(values, opts);

		// Chain
		return this;
	}

	// Chain
	set() { super.set(...arguments); return this; }
	remove() { super.remove(...arguments); return this; }
	reset() { super.reset(...arguments); return this; }

	/**
	 * Create a way to output our elements to HTML
	 * @method toHTML
	 * @return {String}
	 */
	toHTML() {
		let html = '';
		this.forEach(item => html += item.get('html') || '');
		return html;
	}

	// Join alias toHTML for b/c
	join() { return this.toHTML(); }
}
ElementsCollection.initClass();


// =====================================
// Export
module.exports = ElementsCollection;
