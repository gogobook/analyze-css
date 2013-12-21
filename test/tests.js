var analyzer = require('../'),
	assert = require('assert'),
	tests,
	testSelector;

tests = [
	// comments
	{
		css: '.foo { color: red } /* test */',
		metrics: {
			comments: 1,
			commentsLength: 6
		}
	},
	{
		css: 'body { padding-bottom: 6em; min-width: 40em; /* for the tabs, mostly */ }',
		metrics: {
			comments: 1,
			commentsLength: 22
		}
	},

	// complex selectors
	{
		css: 'header ul li .foo { color: red }',
		metrics: {
			complexSelectors: 1
		}
	},

	// empty rules
	{
		css: '.foo { } .bar { color: red } ',
		metrics: {
			emptyRules: 1
		}
	},
	{
		css: '.foo { /* a comment */ }',
		metrics: {
			emptyRules: 1
		}
	},

	{
		css: '.foo { color:red /* a comment */ }',
		metrics: {
			emptyRules: 0
		}
	},

	// IE fixes
	{
		css: '* html .foo { color: red } .bar { color: blue }',
		metrics: {
			oldIEFixes: 1
		}
	},
	{
		css: '.foo { *color: red; border: blue }',
		metrics: {
			oldIEFixes: 1
		}
	},

	// importants
	{
		css: '.important { color: red !important }',
		metrics: {
			importants: 1
		}
	},

	// length
	{
		css: '.important { color: red !important }',
		metrics: {
			length: 36
		}
	},

	// outdated vendor prefixes
	{
		css: '.foo { -moz-border-radius: 2px }',
		metrics: {
			oldPropertyPrefixes: 1
		}
	},
	{
		css: '.foo { -webkit-animation: none }',
		metrics: {
			oldPropertyPrefixes: 0
		}
	},

	// qualified selectors
	{
		css: '.foo, #bar, header {}',
		metrics: {
			qualifiedSelectors: 0
		}
	},
	{
		css: 'header#nav {}',
		metrics: {
			qualifiedSelectors: 1
		}
	},
	{
		css: '.foo#bar {}',
		metrics: {
			qualifiedSelectors: 1
		}
	},
	{
		css: 'h1.title, a {}',
		metrics: {
			qualifiedSelectors: 1
		}
	},

	// stats
	{
		css: '.foo, .bar { color: red; border: blue }',
		metrics: {
			rules: 1,
			selectors: 2,
			declarations: 2
		}
	},
	{
		css: '#foo {}',
		metrics: {
			selectorsById: 1
		}
	},
	{
		css: 'a {}',
		metrics: {
			selectorsByTag: 1
		}
	},
	{
		css: '* {}',
		metrics: {
			selectorsByTag: 0
		}
	},
	{
		css: '[href] {}',
		metrics: {
			selectorsByAttribute: 1,
		}
	},
	{
		css: '.bar {}',
		metrics: {
			selectorsByClass: 1,
		}
	},
	{
		css: 'a:hover {}',
		metrics: {
			selectorsByPseudo: 1,
		}
	},
	{
		css: '#foo, a.bar, li, a[href], a:hover {}',
		metrics: {
			selectorsByAttribute: 1,
			selectorsByClass: 1,
			selectorsById: 1,
			selectorsByPseudo: 1,
			selectorsByTag: 4
		}
	},

	// universal selectors
	{
		css: '* html .ui-autocomplete {}',
		metrics: {
			universalSelectors: 0
		}
	},
	{
		css: 'input[type="..."] {}',
		metrics: {
			universalSelectors: 0
		}
	},
	{
		css: '.foo[type="..."] {}',
		metrics: {
			universalSelectors: 0
		}
	},
	{
		css: '#id[type="..."] {}',
		metrics: {
			universalSelectors: 0
		}
	},
	{
		css: '[type="..."] {}',
		metrics: {
			universalSelectors: 1
		}
	},
	{
		css: 'ul :hover {}',
		metrics: {
			universalSelectors: 1
		}
	},
	{
		css: '.foo > * {}',
		metrics: {
			universalSelectors: 1
		}
	},
	{
		css: 'table.wikitable>*>tr>th {}',
		metrics: {
			universalSelectors: 1
		}
	},
	{
		css: '.foo * li {}',
		metrics: {
			universalSelectors: 1
		}
	}
];

testSelector = function(test) {
	describe('should return proper metrics', function() {
		it('for "' + test.css + '"', function(done) {
			new analyzer(test.css, function(err, res) {
				var actualMetrics = res.metrics,
					expectedMetrics = test.metrics;

				Object.keys(expectedMetrics).forEach(function(metric) {
					assert.equal(expectedMetrics[metric], actualMetrics[metric], metric + ' should equal ' + expectedMetrics[metric] + ' (was ' + actualMetrics[metric]  + ')');
				});

				done();
			});
		});
	});
};

describe('Analyzer', function() {
	tests.forEach(testSelector);
});
