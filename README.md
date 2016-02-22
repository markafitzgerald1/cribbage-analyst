# cribbage-analyst [![Build Status](https://travis-ci.org/markafitzgerald1/cribbage-analyst.svg?branch=master)](https://travis-ci.org/markafitzgerald1/cribbage-analyst) [![Coverage Status](https://coveralls.io/repos/github/markafitzgerald1/cribbage-analyst/badge.svg?branch=master)](https://coveralls.io/github/markafitzgerald1/cribbage-analyst?branch=master)
Two-player [cribbage](https://en.wikipedia.org/wiki/Cribbage) discard analysis tool.

To locally configure and install cribbage-analyst, [install Node.js](https://nodejs.org/en/), [clone this Git repository](https://help.github.com/articles/cloning-a-repository/), then run `npm install` to download project development dependencies.

(Optional - for developers:) To execute project code quality checks ([JSHint](http://jshint.com/), [Jasmine](http://jasmine.github.io/2.4/introduction.html) specs (unit tests), [JSCS](http://jscs.info/)), then generate [JSDoc](http://usejsdoc.org/index.html) and the [Webpack](https://webpack.github.io/) bundle for invocation in-browser, run `node_modules/gulp-cli/bin/gulp.js`. To have such checks always run before Git accepts a `git commit`, copy `.git/hooks/pre-commit.sample` to `.git/hooks/pre-commit`, then add one line to the end of `.git/hooks/pre-commit` which reads `node_modules/gulp-cli/bin/gulp.js`.

To run the single page web application, open `index.html` in an [ECMAScript 5 Array.prototype supporting](http://kangax.github.io/compat-table/es5/) (IE9+, Safari 5+, any recent Chrome or Firefox, etc.) web browser. :)
