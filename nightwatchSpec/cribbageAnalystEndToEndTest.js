/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals module */

(function() {
    'use strict';

    /* Create at least one e2e test verifying entry point + HTML with Vue.js
     * markup works as expected - at least for a happy path. */

    module.exports = {
        // jscs:disable jsDoc
        'Happy path test': function(browser) {
            // jscs:enable jsDoc
            browser
                .url('http://localhost:8080/index.html')
                .waitForElementVisible('body', 1000)
                .setValue('input[type=text]', 'Q7742A')
                .click('button')
                .pause(100)
                .assert.containsText('#discardOptions',
                    'Keep Q77A, discard 42 = 2 points')
                .end();
        },
    };
}());
