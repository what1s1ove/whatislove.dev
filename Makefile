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
	npx prettier --write "**/*.{json,md,yml,njk,css,js,cjs,d.ts}"

# Lint

lint_fs:
	npx ls-lint
lint_editor:
	npx editorconfig-checker
lint_prettify:
	npx prettier --check "**/*.{json,md,yml,njk,css,js,cjs,d.ts}"
lint_markup:
	npx node-w3c-validator -i "build/*.html" -f lint -evH
lint_html:
	npx linthtml "source/**/*.njk"
lint_bem:
	npx bemlint "source/**/*.njk" --errors
lint_css:
	npx stylelint "source/styles/**/*.css"
lint_js:
	npx eslint "**/*.{js,cjs}"
lint_type:
	npx tsc --noEmit
lint: lint_fs lint_editor lint_prettify lint_html lint_bem lint_css lint_js lint_type lint_markup
