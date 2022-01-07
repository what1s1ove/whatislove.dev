# Base

clean:
	rm -rf build
start:
	npx concurrently -k -p "{name}: {time}" -n "CLIENT,SERVER" -c "green,blue" "make start_client" "make start_server"
start_client:
	NODE_ENV=development npx gulp
start_server:
	npx json-server db/database.json
build: clean
	npx gulp

# Lint

lint_fs:
	npx ls-lint
lint_editorconfig:
	npx editorconfig-checker
lint_html:
	npx node-w3c-validator -i build/*.html -f lint -evH
lint_css:
	npx stylelint "source/css/**/*.css"
lint_js:
	npx eslint --ext .js source/js
lint: lint_fs lint_editorconfig lint_html lint_css lint_js
