/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
module.exports = {
	reportStatistics: false,
	reportErrors: false,
	detectEncoding: require('safeps').isWindows() === false,

	// Why is this here?
	// When the DocPad plugins are specified in test/package.json
	// npm will install the latest stable (not our dev) docpad into test/node_modules
	// so we would be testing our old stable docpad, rather than our new dev local docpad
	// To get around this, we moved the docpad plugins into docpad's dev deps
	// then we tell our test docpad site to use docpad's node modules directory for plugins
	pluginsPaths: ['../node_modules'],

	environments: {
		development: {
			a: 'websiteConfig',
			b: 'websiteConfig',
			c: 'websiteConfig',
			templateData: {
				a: 'websiteConfig',
				b: 'websiteConfig',
				c: 'websiteConfig'
			}
		}
	},

	templateData: {
		require,

		site: {
			styles: ['/styles/style.css'],
			scripts: ['/scripts/script.js'],
			title: "Your Website",
			description: `\
When your website appears in search results in say Google, the text here will be shown underneath your website's title.\
`,
			keywords: `\
place, your, website, keywoards, here, keep, them, related, to, the, content, of, your, website\
`
		},

		// Get the prepared site/document title
		// Often we would like to specify particular formatting to our page's title
		// we can apply that formatting here
		getPreparedTitle() {
			// if we have a document title, then we should use that and suffix the site's title onto it
			if (this.document.title) {
				return `${this.document.title} | ${this.site.title}`;
			// if our document does not have it's own title, then we should just use the site's title
			} else {
				return this.site.title;
			}
		},

		// Get the prepared site/document description
		getPreparedDescription() {
			// if we have a document description, then we should use that, otherwise use the site's description
			return this.document.description || this.site.description;
		},

		// Get the prepared site/document keywords
		getPreparedKeywords() {
			// Merge the document keywords with the site keywords
			return this.site.keywords.concat(this.document.keywords || []).join(', ');
		}
	},

	collections: {
		docpadConfigCollection(database) {
			return database.findAllLive({tag: {$has: 'docpad-config-collection'}});
		}
	},

	events: {
		renderDocument(opts) {
			const src = "testing the docpad configuration renderDocument event";
			const out = src.toUpperCase();
			return opts.content = (opts.content || '').replace(src, out);
		}
	}
};
