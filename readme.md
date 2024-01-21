# whatislove.dev's websites

[![Continuous Integration](https://github.com/what1s1ove/whatislove.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/what1s1ove/whatislove.dev/actions/workflows/ci.yml)
[![Continuous Delivery](https://github.com/what1s1ove/whatislove.dev/actions/workflows/cd.yml/badge.svg)](https://github.com/what1s1ove/whatislove.dev/actions/workflows/cd.yml)

This repository is responsible for the whatislove.dev's websites.

-   [whatislove.dev](./apps/whatislove-dev) – Vladyslav Zubko's website. If you want to get to know me better.
-   [certifications.whatislove.dev](./apps/certifications-whatislove-dev) – Certificates Manager. If you want to move on.

## Requirements

-   Node.js ([LTS](https://nodejs.org/en/about/previous-releases))
-   NPM ([LTS](https://nodejs.org/en/about/previous-releases))

## Base Scripts

-   Install dependencies: **`npm install`**
-   Apply git hooks: **`npm run ci:prepare`**
-   Lint code: **`npm run ci:lint`**
-   Format code: **`npm run ci:format`**

_Rest of scripts can be found in the root `package.json` and in the `package.json` of each workspace._

## License

This project is open source under the [MIT license](./LICENSE), which means you have access to the source code and can use it all, except design, to fit your own needs but don't have access to deploy.
