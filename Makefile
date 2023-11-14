# Base

clean:
	rm -rf build
start:
	npx concurrently -k -p "{name}: {time}" -n "CLIENT,SERVER" -c "green,blue" "make start_client" "make start_server"
start_client:
	NODE_ENV=development npx eleventy --serve --quiet
start_server:
	npx json-server source/database.json
build: clean
	npx eleventy

# Prettify

prettify:
	npx prettier --write "**/*.{json,yml,css,js,cjs}"

# Lint

lint_fs:
	npx ls-lint
lint_editorconfig:
	npx editorconfig-checker
lint_prettify:
	npx prettier --check "**/*.{json,yml,css,js,cjs}"
lint_html:
	npx node-w3c-validator -i build/*.html -f lint -evH
lint_css:
	npx stylelint "source/styles/**/*.css"
lint_js:
	npx eslint --ext .js "**/*.{js,cjs}"
lint: lint_fs lint_editorconfig lint_prettify lint_html lint_css lint_js
