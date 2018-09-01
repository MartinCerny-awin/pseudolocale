REPORTER ?= dot
TESTS ?= $(shell find test -name "*-test.js")

all: \
	pseudolocale.js \
	pseudolocale.min.js \
	component.json \
	package.json

.PHONY: clean all test test-cov

test: pseudolocale.js
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) $(TESTS)

test-cov: pseudolocale-cov.js
	@PSEUDOLOC_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

pseudolocale-cov.js: pseudolocale.js
	@rm -f $@
	@jscoverage --no-highlight src src-cov \
		--no-instrument=pseudolocale.js \
		--no-instrument=core/index.js \
		--no-instrument=start.js \
		--no-instrument=end.js \
		--no-instrument=component.js \
		--no-instrument=package.js
	node_modules/.bin/smash src-cov/pseudolocale.js > pseudolocale-cov.js
	@chmod a-w $@

benchmark: all
	@node benchmark/bench.js

pseudolocale.js: $(shell node_modules/.bin/smash --list src/pseudolocale.js)
	@rm -f $@
	node_modules/.bin/smash src/pseudolocale.js | node_modules/.bin/uglifyjs -b indent_level=2 -o $@
	@chmod a-w $@

pseudolocale.min.js: pseudolocale.js
	@rm -f $@
	node_modules/.bin/uglifyjs $< -c -m -o $@

component.json: src/component.js pseudolocale.js
	@rm -f $@
	node src/component.js > $@
	@chmod a-w $@

package.json: src/package.js pseudolocale.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@

clean:
	rm -f pseudolocale*.js package.json component.json