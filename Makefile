# Start

start:
	npx concurrently -k -p "{name}: {time}" -n "CLIENT,SERVER" -c "green,blue" "make start-client" "make start-server"
start-client:
	NODE_ENV=development npx eleventy --serve --quiet
start-server:
	npx json-server --watch source/database.json --port 3001

# Build

build: build-clean
	npx eleventy
build-clean:
	rm -rf build

# CI

ci-format:
	npx prettier --write "**/*.{json,md,yml,njk,css,js,cjs,d.ts}"
ci-lint-fs:
	npx ls-lint
ci-lint-editor:
	npx editorconfig-checker
ci-lint-format:
	npx prettier --check "**/*.{json,md,yml,njk,css,js,cjs,d.ts}"
ci-lint-markup:
	npx w3c-html-validator "build"
ci-lint-html:
	npx linthtml "source/**/*.njk"
ci-lint-bem:
	npx bemlint "source/**/*.njk" --errors
ci-lint-css:
	npx stylelint "source/styles/**/*.css"
ci-lint-js:
	npx eslint "**/*.js"
ci-lint-js-fix:
	npx eslint "**/*.js" --fix
ci-lint-type:
	npx tsc --noEmit
ci-lint: ci-lint-fs ci-lint-editor ci-lint-format ci-lint-markup ci-lint-html ci-lint-bem ci-lint-css ci-lint-js ci-lint-type
