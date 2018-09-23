# cribbage-analyst [![Build Status](https://travis-ci.org/markafitzgerald1/cribbage-analyst.svg?branch=master)](https://travis-ci.org/markafitzgerald1/cribbage-analyst)
Two-player [cribbage](https://en.wikipedia.org/wiki/Cribbage) discard analysis tool.

## Installation
* Install [Node.js 8 LTS](https://nodejs.org/en/download/) or
  [Node.js 6 LTS](https://nodejs.org/en/download/releases/);
* [clone this Git repository](https://help.github.com/articles/cloning-a-repository/); then
* run `npm install` to download project operational and development dependencies.

## Execution
* Server: `node_modules/.bin/gulp startServer &`.
* Client: open `index.html` in an [ECMAScript 5 Array.prototype
  supporting](http://kangax.github.io/compat-table/es5/) (IE9+, Safari 5+, any recent Chrome or
  Firefox, etc.) web browser. :)

## Developer setup
To execute the standard code quality checks of the project, bundle all JavaScript, make the webapp
deployable and generate code documentation via [JSHint](http://jshint.com/),
[Jasmine](http://jasmine.github.io/2.4/introduction.html), [JSCS](http://jscs.info/),
[gulp-coverage](https://github.com/dylanb/gulp-coverage)), [JSDoc](http://usejsdoc.org/index.html),
[webpack](https://webpack.github.io/) and [Nightwatch](http://nightwatchjs.org/):
* add `node_modules/chromedriver/lib/chromedriver` to your `PATH` environment variable in order to
  make [ChromeDriver](http://chromedriver.chromium.org/) findable,
* run `node_modules/.bin/gulp startServer` in the background, then
* run `node_modules/.bin/gulp`.

To instead test with Firefox add `node_modules/geckodriver` to `PATH`, set `nightwatch.conf.js`
`"browserName"` to `"firefox"`. To instead test with headless Firefox set the `MOZ_HEADLESS`
environment variable to `1` before starting `gulp`.

To test with Microsoft Edge on Windows 10 (real or
[testing virtual machine](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)) add
`node_modules/edgedriver/lib/edgedriver` to `PATH` and set `nightwatch.conf.js` `"browserName"` to
`MicrosoftEdge`.

To have the above project build steps always run and be verified to have run successfully before
Git accepts a `git commit`:
* copy `.git/hooks/pre-commit.sample` to `.git/hooks/pre-commit`, then
* add one line to the end of `.git/hooks/pre-commit` which reads `node_modules/.bin/gulp`.
